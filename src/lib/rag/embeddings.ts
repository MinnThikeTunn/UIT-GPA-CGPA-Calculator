import { OpenRouterEmbeddings } from "@langchain/openrouter";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY environment variable not set");
}

export const embeddings = new OpenRouterEmbeddings({
  model: "nvidia/llama-nemotron-embed-vl-1b-v2:free",
  openRouterUrl: "https://openrouter.ai/api/v1",
  openRouterApiKey: OPENROUTER_API_KEY,
});