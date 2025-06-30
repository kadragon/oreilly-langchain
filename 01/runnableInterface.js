import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });

const completion = await model.invoke("Hi there!");

console.log(completion.content);

const completions = await model.batch(["Hi there!", "Bye!"]);

console.log(completions.map((v) => v.content));

for await (const token of await model.stream("Hi there!")) {
  console.log(token.content);
}
