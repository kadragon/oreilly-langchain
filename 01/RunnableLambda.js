import { getOpenAIModel } from "../lib/model.js";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";

const template = ChatPromptTemplate.fromMessages([
  ["system", "당신은 친절한 어시스턴트입니다."],
  ["human", "{question}"],
]);

const model = getOpenAIModel();

const chatbot = RunnableLambda.from(async (values) => {
  const prompt = await template.invoke(values);
  return await model.invoke(prompt);
});

const response = await chatbot.invoke({
  question: "프랑스의 수도는 어디인가요?",
});

console.log(response.content);

const chatbotStream = RunnableLambda.from(async (values) => {
  const prompt = await template.invoke(values);
  return model.stream(prompt);
});

for await (const token of await chatbotStream.stream({
  question: "프랑스의 수도는 어디인가요?",
})) {
  console.log(token.content);
}
