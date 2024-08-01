import { GoogleGenerativeAI } from "@google/generative-ai";
import { reactive, ref } from "vue";

const runtimeConfig = useRuntimeConfig();

const genAI = new GoogleGenerativeAI(runtimeConfig.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface ChatMessagePart {
  text: string;
}

interface ChatMessage {
  role: "user" | "model";
  parts: ChatMessagePart[];
}
type ChatHistory = ChatMessage[];

const chatHistory = reactive<ChatHistory>([]);

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event);
  const chat = model.startChat({ history: chatHistory.value });

  const processPrompt = async (rawPrompt: string) => {
    chatHistory.value.push({ role: "user", parts: [{ text: prompt }] });

    const result = await chat.sendMessageStream(prompt);
    const response = result.stream;

    let geminiResponse = ref<string>("");

    for await (const chunk of response) {
      geminiResponse.value += chunk.text();
    }

    chatHistory.value.push({
      role: "model",
      parts: [{ text: geminiResponse.value }],
    });
  };

  await processPrompt(prompt);
  return chatHistory.value;
});
