import { GoogleGenerativeAI } from '@google/generative-ai'
import type { History } from '~/store/chatSchema'

// Get runtime configuration variables
const runtime = useRuntimeConfig()

// Create a new instance of the Google Generative AI client with the API key from runtime config
const genAI = new GoogleGenerativeAI(runtime.geminiApiKey)

// Get the 'gemini-1.5-flash' generative model and set the system instruction
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash', 
  systemInstruction: 'You are a helpful AI assistant whose name is BRAINIAC' 
})

// Initialize an empty conversation history 
const chatHistory: History = []

// Define an asynchronous event handler function for POST requests to the '/api/brainiac' endpoint
export default defineEventHandler(async (event) => {
  // Extract the 'prompt' from the request body
  const { prompt } = await readBody(event)

  // Return early if no prompt is provided
  if (!prompt) {
    return 
  }

  // Start a new chat with the Gemini model using the 'chatHistory' instance
  const chat = model.startChat({ history: chatHistory })

  // Send the user's prompt to the model and await the response
  const response = await chat.sendMessage(prompt)

  // Return the text content of the response
  return response.response.text()
})
