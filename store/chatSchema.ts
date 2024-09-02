// Define types for different roles in the conversation
type Role = 'user' | 'model'

// Define a type for a part of a message
type Part = {
  text: string // The actual text content of the part
}

// Define a type for a message in the conversation
type Message = {
  role: Role // The role of the sender (user or model)
  parts: Part[] // An array of parts that make up the message
}

// Define a type for the conversation history, which is an array of messages
type History = Message[]

// Export the types
export type { History, Message }
