import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const markdownText = `
# LangChain Building Applications with LLMs through composability

## Quick Install
\`\`\`bash
npm install langchain
\`\`\`

As an open source project in a rapidly developing field, we are extremely open to contributions.
`;

const mdSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
  chunkSize: 60,
  chunkOverlap: 0,
});

const docs = await mdSplitter.createDocuments(
  [markdownText],
  [{ source: "https://www.langchain.com" }]
);

console.log(docs);
