import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function summarizeDocument(text: string, mode: 'basic' | 'detailed'): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
    }

    const prompt = mode === 'basic' 
      ? `다음 문서의 핵심 내용을 간단하고 명료하게 요약해주세요. 주요 포인트들을 불릿 포인트 형태로 정리하고, 전체적인 결론을 제시해주세요:\n\n${text.substring(0, 10000)}`
      : `다음 문서의 내용을 자세하고 포괄적으로 요약해주세요. 주요 섹션별로 구분하여 설명하고, 세부적인 내용과 중요한 데이터, 결론을 포함해주세요:\n\n${text.substring(0, 15000)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: mode === 'basic' ? 500 : 1500,
        temperature: 0.3,
      }
    });

    if (!response.response?.text) {
      throw new Error("Gemini API에서 응답을 받지 못했습니다.");
    }

    return response.response.text() || "요약을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Error summarizing document:", error);
    if (error instanceof Error) {
      throw new Error(`문서 요약 중 오류가 발생했습니다: ${error.message}`);
    }
    throw new Error("문서 요약 중 알 수 없는 오류가 발생했습니다.");
  }
}
