import { DocumentChunk, RetrievedChunk } from "./types";

export class InMemoryVectorStore {
  private data: { chunk: DocumentChunk; embedding: number[] }[] = [];

  add(chunks: DocumentChunk[], embeddings: number[][]) {
    if (chunks.length !== embeddings.length) {
      throw new Error("Chunks and embeddings length mismatch");
    }
    for (let i = 0; i < chunks.length; i++) {
      this.data.push({ chunk: chunks[i], embedding: embeddings[i] });
    }
  }

  search(
    queryEmbedding: number[],
    topK: number = 3,
    threshold: number = 0.7
  ): RetrievedChunk[] {
    const scored = this.data.map((item) => ({
      chunk: item.chunk,
      score: this.cosineSimilarity(queryEmbedding, item.embedding),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.filter((s) => s.score >= threshold).slice(0, topK);
  }

  get size() {
    return this.data.length;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
