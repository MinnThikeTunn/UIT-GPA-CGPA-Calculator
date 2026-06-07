import { DocumentChunk } from "./types";

// ------------------------------------------------------------------
// Environment checks
// ------------------------------------------------------------------
const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

if (!QDRANT_URL) {
  console.warn("[RAG] QDRANT_URL not set. Qdrant features will not work.");
}

const HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

if (QDRANT_API_KEY) {
  HEADERS["api-key"] = QDRANT_API_KEY;
}

// ------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------
export const COLLECTION_NAME = "rag_documents";
export const VECTOR_SIZE = Number(process.env.EMBED_DIMENSION) || 768;
export const DISTANCE = "Cosine" as const;

// ------------------------------------------------------------------
// Collection helpers
// ------------------------------------------------------------------

export function isQdrantAvailable(): boolean {
  return Boolean(QDRANT_URL);
}

export async function ensureCollection(): Promise<void> {
  if (!QDRANT_URL) {
    throw new Error("QDRANT_URL not set");
  }

  const checkRes = await fetch(`${QDRANT_URL}/collections/${COLLECTION_NAME}`, {
    headers: HEADERS,
  });

  if (checkRes.status === 404) {
    const createRes = await fetch(`${QDRANT_URL}/collections/${COLLECTION_NAME}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        vectors: {
          size: VECTOR_SIZE,
          distance: DISTANCE,
        },
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      throw new Error(`Failed to create Qdrant collection: ${err}`);
    }

    console.log(`[RAG] Created Qdrant collection '${COLLECTION_NAME}' (size=${VECTOR_SIZE})`);
  } else if (!checkRes.ok) {
    const err = await checkRes.text();
    throw new Error(`Failed to check Qdrant collection: ${err}`);
  }
}

// ------------------------------------------------------------------
// Points
// ------------------------------------------------------------------

interface QdrantPoint {
  id: string;
  vector: number[];
  payload: Record<string, unknown>;
}

export async function upsertPoints(points: QdrantPoint[]): Promise<void> {
  if (!QDRANT_URL) {
    throw new Error("QDRANT_URL not set");
  }

  const res = await fetch(`${QDRANT_URL}/collections/${COLLECTION_NAME}/points?wait=true`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify({ points }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Qdrant upsert failed: ${err}`);
  }
}

interface QdrantSearchResult {
  id: string;
  score: number;
  payload: Record<string, unknown>;
}

export async function searchVectors(
  vector: number[],
  topK: number = 3,
  threshold: number = 0.0
): Promise<QdrantSearchResult[]> {
  if (!QDRANT_URL) {
    throw new Error("QDRANT_URL not set");
  }

  const res = await fetch(`${QDRANT_URL}/collections/${COLLECTION_NAME}/points/search`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      vector,
      limit: topK,
      score_threshold: threshold,
      with_payload: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Qdrant search failed: ${err}`);
  }

  const data = (await res.json()) as { result: QdrantSearchResult[] };
  return data.result;
}
