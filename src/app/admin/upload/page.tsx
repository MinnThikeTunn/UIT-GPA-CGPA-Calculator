"use client";

import { useState } from "react";
import { DOCXLoader } from "@langchain/community/document_loaders";
import { ingestDocuments } from "@/lib/rag/ingest";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Ready");

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleUpload = async () => {
    if (!file) return setStatus("No file selected");
    setStatus("Uploading...");

    try {
      // Save uploaded file to public/rules/
      const fs = require("fs");
      const path = require("path");
      const uploadDir = path.join(process.cwd(), "public","rules");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      }));

      // Ingest the new document
      await ingestDocuments();
      setStatus(`Successfully uploaded "${file.name}"`);
    } catch (err) {
      setStatus(`Error: \${err.message}`);
    }
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload Rules</button>
      <p style="margin-top: 16px;">{status}</p>
    </div>
  );
};

export default UploadPage;
