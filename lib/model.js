import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

/**
 * ChatOpenAI 모델 인스턴스를 반환하는 함수
 * @param {Object} [options] - 추가 설정 (예: model, temperature 등)
 * @returns {ChatOpenAI} 모델 인스턴스
 */
export function getOpenAIModel(options = {}) {
  // 기본값 설정
  const defaultOptions = {
    model: "gpt-4.1-mini",
    temperature: 0,
    // 필요시 여기에 다른 기본 옵션 추가
  };
  return new ChatOpenAI({ ...defaultOptions, ...options });
}
