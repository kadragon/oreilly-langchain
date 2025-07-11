import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({ model: "gpt-4.1-mini" });

// HumanMessage(사용자), AIMessage(어시스턴트), SystemMessage(시스템), ChatMessage(임시)
const prompt = [
  new SystemMessage(
    "당신은 문장 끝에 느낌표를 세 개 붙여 대답하는 친절한 어시스턴트입니다."
  ),
  new HumanMessage("프랑스의 수도는 어디인가요?"),
];

const response = await model.invoke(prompt);

console.log(response.content);
