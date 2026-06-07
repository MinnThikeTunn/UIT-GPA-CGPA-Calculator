import { DocumentChunk } from "./types";

const DEFAULT_MAX_CHUNK_SIZE = 800;

export function chunkDocument(
  text: string,
  source: string,
  maxChunkSize: number = DEFAULT_MAX_CHUNK_SIZE
): DocumentChunk[] {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const chunks: DocumentChunk[] = [];
  let index = 0;

  for (const para of paragraphs) {
    if (para.length <= maxChunkSize) {
      chunks.push({
        id: `${source}-${index}`,
        text: para.trim(),
        source,
        index,
      });
      index++;
    } else {
      const sentences = para.split(/(?<=[.!?])\s+/);
      let currentChunk = "";

      for (const sentence of sentences) {
        if (
          currentChunk.length + sentence.length > maxChunkSize &&
          currentChunk.length > 0
        ) {
          chunks.push({
            id: `${source}-${index}`,
            text: currentChunk.trim(),
            source,
            index,
          });
          index++;
          currentChunk = sentence;
        } else {
          currentChunk += (currentChunk ? " " : "") + sentence;
        }
      }

      if (currentChunk.trim().length > 0) {
        chunks.push({
          id: `${source}-${index}`,
          text: currentChunk.trim(),
          source,
          index,
        });
        index++;
      }
    }
  }

  return chunks;
}
