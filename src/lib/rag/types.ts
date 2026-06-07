export interface DocumentChunk {
  id: string;
  text: string;
  source: string;
  index: number;
}

export interface RetrievedChunk {
  chunk: DocumentChunk;
  score: number;
}
