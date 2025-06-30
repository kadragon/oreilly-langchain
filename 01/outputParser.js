import { CommaSeparatedListOutputParser } from "langchain/output_parsers";

const parser = new CommaSeparatedListOutputParser();

const response = await parser.invoke("apple, banana, cherry");

console.log(response);
