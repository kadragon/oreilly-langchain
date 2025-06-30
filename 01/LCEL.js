import { ChatPromptTemplate } from "@langchain/core/prompts";
import { getOpenAIModel } from "../lib/model.js";

const template = ChatPromptTemplate.fromMessages([
  ["system", "당신은 친절한 어시스턴트입니다."],
  ["human", "{question}"],
]);

const model = getOpenAIModel({ streaming: true });
const chatbot = template.pipe(model);

// const response = await chatbot.invoke({
//   question: "거대 언어 모델은 어디서 제공하나요?",
// });

// console.log(response.content);
const response = await chatbot.stream({
  question: "거대 언어 모델은 어디서 제공하나요?",
});

for await (const token of response) {
  console.log(token.content);
}
