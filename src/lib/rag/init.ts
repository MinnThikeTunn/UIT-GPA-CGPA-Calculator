import fs from "fs";
import path from "path";
import { chunkDocument } from "./chunker";
import { batchEmbed } from "./embedder";
import { InMemoryVectorStore } from "./vectorStore";
import { ensureCollection, upsertPoints } from "./qdrantClient";

declare global {
  var __vectorStore: InMemoryVectorStore | undefined;
  var __ingestPromise: Promise<InMemoryVectorStore> | undefined;
}

function getStore(): InMemoryVectorStore {
  if (!globalThis.__vectorStore) {
    globalThis.__vectorStore = new InMemoryVectorStore();
  }
  return globalThis.__vectorStore;
}

function getFilePaths(): { source: string; path: string }[] {
  const dataDir = path.join(process.cwd(), "data");
  try {
    const allFiles = fs.readdirSync(dataDir);
    const textFiles = allFiles.filter(
      (f) => f.endsWith(".txt") || f.endsWith(".md") || f.endsWith(".docx")
    );
    return textFiles.map((f) => ({
      source: f.replace(/\.((txt|md|docx))$/, ""),
      path: path.join(dataDir, f),
    }));
  } catch {
    console.warn(
      "[RAG] Data directory not found. No documents will be ingested."
    );
    return [];
  }
}

async function doIngest(): Promise<InMemoryVectorStore> {
  const files = getFilePaths();
  const store = getStore();

  if (files.length === 0) {
    console.warn("[RAG] No .txt or .md files found in data/ directory.");
    return store;
  }

  // Try Qdrant
  let qdrantAvailable = false;
  try {
    await ensureCollection();
    qdrantAvailable = true;
    console.log("[RAG] Qdrant available. Will upsert embeddings to Qdrant.");
  } catch (err) {
    console.warn(
      "[RAG] Qdrant not available, falling back to in-memory store.",
      err
    );
  }

  for (const file of files) {
    try {
      let text: string;
      if (file.path.endsWith(".docx")) {
        // Extract raw text from .docx using mammoth
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ path: file.path });
        text = result.value;
      } else {
        // .txt or .md – read directly
        text = fs.readFileSync(file.path, "utf-8");
      }
      const chunks = chunkDocument(text, file.source);
      const embeddings = await batchEmbed(chunks.map((c) => c.text));

      store.add(chunks, embeddings);

      if (qdrantAvailable) {
        const points = chunks.map((chunk, i) => ({
          id: chunk.id,
          vector: embeddings[i],
          payload: {
            text: chunk.text,
            source: chunk.source,
            index: chunk.index,
          },
        }));
        await upsertPoints(points);
        console.log(
          `[RAG] Upserted ${chunks.length} chunks to Qdrant from '${file.source}'`
        );
      } else {
        console.log(
          `[RAG] Ingested ${chunks.length} chunks into in-memory store from '${file.source}'`
        );
      }
    } catch (err) {
      console.error(`[RAG] Failed to ingest ${file.path}:`, err);
    }
  }

  return store;
}

export async function initVectorStore(): Promise<InMemoryVectorStore> {
  const store = getStore();

  if (store.size > 0) {
    return store;
  }

  if (!globalThis.__ingestPromise) {
    globalThis.__ingestPromise = doIngest().then(() => getStore());
  }

  return globalThis.__ingestPromise;
}
