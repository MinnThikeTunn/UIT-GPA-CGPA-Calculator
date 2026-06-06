import { generateEmbedding } from "./embedder";
import { searchVectors } from "./qdrantClient";
import { DocumentChunk, RetrievedChunk } from "./types";

/**
 * Retrieve top relevant chunks for a user query using Qdrant.
 * Falls back to in‑memory store if Qdrant unavailable.
 */
export async function retrieve(
  query: string,
  // store kept for backward compatibility – not used when Qdrant works
  _store: any,
  topK: number = 3,
  threshold: number = 0.0
) {
  // Try Qdrant first
  try {
    const queryEmbedding = await generateEmbedding(query);
    const results = await searchVectors(queryEmbedding, topK, threshold);
    const chunks: RetrievedChunk[] = results.map((res) => ({
      chunk: {
        id: res.id,
        text: (res.payload?.text as string) ?? "",
        source: (res.payload?.source as string) ?? "",
        index: (res.payload?.index as number) ?? 0,
      },
      score: res.score,
    }));
    return chunks;
  } catch (err) {
    console.warn("[RAG] Qdrant retrieval failed, falling back to in‑memory store:", err);
    // Existing in‑memory fallback (original logic)
    const embedder = await import("./embedder");
    const [queryEmbedding] = await embedder.batchEmbed([query]);
    // @ts-ignore – store may be any compatible class
    return _store.search(queryEmbedding, topK, threshold);
  }
}
