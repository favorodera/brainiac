import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory } from "~/utils/types";

const runtime = useRuntimeConfig();

const genAI = new GoogleGenerativeAI(runtime.geminiApiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a helpful AI assistant whose name is BRAINIAC, also your name should be written in bold capital letters,also be precise and straight to point.",
});

const chatHistory: ChatHistory = [];

export default defineEventHandler(async (event) => {
  const { prompt, isNewChat }: { prompt: string; isNewChat: boolean } =
    await readBody(event);

  if (isNewChat) {
    chatHistory.length = 0;
  }

  const chat = model.startChat({ history: chatHistory });

  const response = await chat.sendMessage(prompt);

  return response.response.text();
});
