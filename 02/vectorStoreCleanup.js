import "dotenv/config";
import { createHash } from 'crypto';

import { PostgresRecordManager } from "@langchain/community/indexes/postgres";
import { index } from "langchain/indexes";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { v4 as uuidv4 } from "uuid";

const tableName = "test_langchain_02_pgvector";
const connectionString = `postgresql://postgres.${process.env.SUPABASE_PROJECT_ID}:${process.env.SUPABASE_PASSWORD}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres`;

const config = {
  postgresConnectionOptions: {
    connectionString,
  },
  tableName: tableName,

  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
};

const vectorStore = await PGVectorStore.initialize(
  new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
  config
);

const recordManagerConfig = {
  postgresConnectionOptions: {
    connectionString,
  },
  tableName: "upsertion_records",
};

const recordManager = new PostgresRecordManager(
  "test_namespace",
  recordManagerConfig
);

await recordManager.createSchema();

// 문서 내용을 기반으로 안정적인 ID를 생성하는 함수
function generateStableId(content) {
  return createHash('sha256').update(content).digest('hex');
}
const doc1Content = "there are cats in the pond";
const doc2Content = "ducks are also found in the pond";
const docs = [
  {
    pageContent: doc1Content,
    metadata: {
      id: generateStableId(doc1Content),
      source: "cats.txt"
    },
  },
  {
    pageContent: doc2Content,
    metadata: {
      id: generateStableId(doc2Content),
      source: "ducks.txt"
    },
  },
];

console.log(docs);

const index_attempt_1 = await index({
  docsSource: docs,
  recordManager,
  vectorStore,
  options: {
    cleanup: "incremental",
    sourceIdKey: "source",
  },
});

console.log(index_attempt_1);

const index_attempt_2 = await index({
  docsSource: docs,
  recordManager,
  vectorStore,
  options: {
    cleanup: "incremental",
    sourceIdKey: "source",
  },
});

console.log(index_attempt_2);

docs[0].pageContent = "I modified the first document content";
docs[0].metadata.id = generateStableId(docs[0].pageContent);
const index_attempt_3 = await index({
  docsSource: docs,
  recordManager,
  vectorStore,
  options: {
    cleanup: "incremental",
    sourceIdKey: "source",
  },
});

console.log(index_attempt_3);
