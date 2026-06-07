"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { initVectorStore } from "@/lib/rag/init";
import { retrieve } from "@/lib/rag/retriever";
import { buildPrompt } from "@/lib/rag/guardrails";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export async function sendChatMessage(query: string, history: ChatMessage[]) {
  try {
    const store = await initVectorStore();
    // Use no threshold - get top results regardless of score
    const retrieved = await retrieve(query, store, 10, 0.0);

    // Log what was retrieved for debugging
    console.log("[RAG] Query:", query);
    console.log("[RAG] Retrieved", retrieved.length, "chunks:");
    retrieved.forEach(function(r, i) {
      console.log("[RAG]   " + (i + 1) + ". [" + r.score.toFixed(3) + "] " + r.chunk.source + "#" + r.chunk.index + ": " + r.chunk.text.substring(0, 100) + "...");
    });

    if (retrieved.length === 0) {
      return {
        output: "I do not have enough information in the provided school rules to answer that question.",
        sources: [],
      };
    }

    // Clean context - just the text, no metadata clutter
    const context = retrieved
      .map(function(r) { return r.chunk.text; })
      .join("\n\n");

    const prompt = buildPrompt(context, query);

    const result = await streamText({
      model: google("gemini-3.1-flash-lite"),
      prompt: prompt,
    });

    const output = await result.text;

    return {
      output: output,
      sources: retrieved.map(function(r) {
        return {
          source: r.chunk.source,
          score: r.score,
        };
      }),
    };
  } catch (err) {
    console.error("[RAG] Action error:", err);
    return {
      output: "Sorry, an error occurred while processing your request.",
      sources: [],
    };
  }
}