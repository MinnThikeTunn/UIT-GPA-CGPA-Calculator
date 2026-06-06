import { Document } from "@langchain/core/documents";
import { TextLoader } from "@langchain/community/document_loaders";
import { PDFLoader } from "@langchain/community/document_loaders";
import { DOCXLoader } from "langchain-document-loader-docx";
import { RecursiveCharacterTextSplitter } from "@langchain/core/document_transformers";

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

/**
 * Load a single file (txt, md, pdf, or docx) and return Document(s).
 */
async function loadFile(filePath: string): Promise<Document[]> {
  const ext = filePath.toLowerCase().split(".").pop();

  let loader;
  switch (ext) {
    case "txt":
      loader = new TextLoader(filePath);
      break;
    case "md":
      loader = new TextLoader(filePath);
      break;
    case "pdf":
      loader = new PDFLoader(filePath);
      break;
    case "docx":
      // DOCXLoader needs the docx plugin; ensure it is listed in dependencies
      loader = new DOCXLoader(filePath);
      break;
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }

  const docs = await loader.loadAndSplit();

  // Optional: filter empty or overly short docs
  const filtered = docs.filter(
    (doc) => doc.pageContent && doc.pageContent.trim().length > 0
  );

  // Split into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
    separators: ["\n\n", "\n", " ", ""],
  });

  const chunks = await splitter.splitDocuments(filtered);
  return chunks;
}

/**
 * Load all documents from the public/rules directory and
 * return an array of Documents with metadata (source filename).
 */
export async function ingestDocuments(): Promise<Document[]> {
  const importAll = require.context("public/rules", false, /\.(txt|md|pdf|docx)$/i);
  const files = importAll.keys();

  const allDocs: Document[] = [];

  for (const filePath of files) {
    const fullPath = filePath.replace("./", "");
    const chunks = await loadFile(fullPath);
    chunks.forEach((doc) => {
      // Attach a source label for later provenance
      doc.metadata.source = filePath;
    });
    allDocs.push(...chunks);
  }

  return allDocs;
}