import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });
const template = ChatPromptTemplate.fromMessages([
  [
    "system",
    '아래 작성한 컨텍스트(Context)를 기반으로 질문(Question)에 대답하세요.  제공된 정보로 대답할 수 없는 질문이라면 "모르겠어요." 라고 대답하세요.',
  ],
  ["human", "Context: {context}"],
  ["human", "Question: {question}\nAnswer:"],
]);

const prompt = await template.invoke({
  context:
    "거대 언어 모델(LLM)은 자연어 처리(NLP) 분야의 쵯니 발전을 이끌고 있습니다. 개발자들은 Hugging Face의 'transformers' 라이브러리르 활용하거나, 'openai' 및  'cohere' 라이브러리를 통해 거대 언어 모델을 사용할 수 있습니다.",
  question: "거대 언어 모델은 어디서 제공하나요?",
});

const response = await model.invoke(prompt);

console.log(response.content);
