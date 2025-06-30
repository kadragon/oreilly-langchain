import "dotenv/config";

import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";

const loader = new TextLoader("./02/test.txt");
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const chunks = await splitter.splitDocuments(docs);

const model = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

const embeddings = await model.embedDocuments(
  chunks.map((chunk) => chunk.pageContent)
);

console.log(embeddings);
