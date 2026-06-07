import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";

const EMBED_MODEL = process.env.EMBED_MODEL || "gemini-embedding-2";
const BATCH_SIZE = 100; // Gemini API limit: max 100 requests per batch
const RPM_LIMIT = 100; // Gemini free tier: 100 embed requests per minute
const DELAY_BETWEEN_BATCHES_MS = Math.ceil(60_000 / RPM_LIMIT) + 1000; // ~1.7s buffer

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: google.embeddingModel(EMBED_MODEL),
    value: text,
  });
  return embedding;
}

export async function batchEmbed(texts: string[]): Promise<number[][]> {
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    console.log(
      `[Embed] Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(texts.length / BATCH_SIZE)} (${batch.length} texts)`
    );

    const { embeddings } = await embedMany({
      model: google.embeddingModel(EMBED_MODEL),
      values: batch,
    });
    allEmbeddings.push(...embeddings);

    // Wait before next batch to respect rate limit
    if (i + BATCH_SIZE < texts.length) {
      console.log(`[Embed] Waiting ${DELAY_BETWEEN_BATCHES_MS}ms to respect rate limit...`);
      await sleep(DELAY_BETWEEN_BATCHES_MS);
    }
  }

  return allEmbeddings;
}
