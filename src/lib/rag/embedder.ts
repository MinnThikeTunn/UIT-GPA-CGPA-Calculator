// Choose embedding provider: "ollama" or "openrouter"
const EMBED_PROVIDER = process.env.EMBED_PROVIDER || "ollama";

// OpenRouter config
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const EMBED_ENDPOINT =
  process.env.OPENROUTER_EMBED_ENDPOINT ||
  "https://openrouter.ai/api/v1/embeddings";
const MODEL =
  process.env.OPENROUTER_EMBEDDING_MODEL ||
  "nvidia/llama-nemotron-embed-vl-1b-v2:free";

// Ollama config
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

const MAX_RETRIES = 3;

async function doOpenRouterEmbed(texts: string[]): Promise<number[][]> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY environment variable not set");
  }

  const body = {
    model: MODEL,
    input: texts,
  };

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(EMBED_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`OpenRouter embed failed ${response.status}: ${text}`);
      }

      const data = (await response.json()) as { data: { embedding: number[] }[] };
      return data.data.map(function(item) { return item.embedding; });
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt >= MAX_RETRIES) break;
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(function(resolve) { setTimeout(resolve, delay); });
    }
  }

  throw lastError || new Error("Failed to generate embeddings after retries");
}

async function doOllamaEmbed(texts: string[]): Promise<number[][]> {
  const response = await fetch(`${OLLAMA_URL}/api/embed`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: OLLAMA_MODEL, input: texts }),
  });

  if (!response.ok) {
    throw new Error(`Ollama embed failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { embeddings: number[][] };
  return data.embeddings;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const embeddings = await batchEmbed([text]);
  return embeddings[0];
}

export async function batchEmbed(texts: string[]): Promise<number[][]> {
  if (EMBED_PROVIDER === "openrouter") {
    console.log("[Embed] Using OpenRouter");
    return doOpenRouterEmbed(texts);
  } else {
    console.log("[Embed] Using Ollama:", OLLAMA_MODEL);
    return doOllamaEmbed(texts);
  }
}