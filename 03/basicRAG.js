import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";

import { connectionString } from "../lib/embedding.js";

import "dotenv/config";

const loader = new TextLoader("./02/test.txt");
const raw_docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const splitDocs = await splitter.splitDocuments(raw_docs);

const model = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

let db;

try {
  // 기존 코드
  db = await PGVectorStore.fromDocuments(splitDocs, model, {
    postgresConnectionOptions: {
      connectionString,
    },
  });

  console.log("Documents have been successfully stored in the database.");
} catch (error) {
  console.error("An error occurred:", error);
} finally {
  if (db) {
    await db.end();
  }
  process.exit(0);
}

