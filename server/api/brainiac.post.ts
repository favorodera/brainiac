import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory } from "~/utils/types";

const runtime = useRuntimeConfig();

const genAI = new GoogleGenerativeAI(runtime.geminiApiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a helpful AI assistant whose name is BRAINIAC",
});

const chatHistory: ChatHistory = [];

export default defineEventHandler(async (event) => {
  const { prompt, newChat }: { prompt: string; newChat: boolean } =
    await readBody(event);

  if (!prompt) {
    return;
  }

  if (newChat) {
    chatHistory.length = 0;
  }

  const chat = model.startChat({ history: chatHistory });

  const response = await chat.sendMessage(prompt);

  return response.response.text();
});
