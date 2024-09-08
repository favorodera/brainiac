import { GoogleGenerativeAI } from "@google/generative-ai";

const runtime = useRuntimeConfig();

const genAI = new GoogleGenerativeAI(runtime.geminiApiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Just go straight to the point and say nothing extra.",
});

export default defineEventHandler(async (event) => {
  const { prompt }: { prompt: string } = await readBody(event);

  if (!prompt) {
    return;
  }

  const summary = await model.generateContent(
    ` In less than 5 to 10 words summarize this prompt, If it is a greeting just reply "Greetings and Inquiry":'${prompt}`
  );

  return summary.response.text();
});
