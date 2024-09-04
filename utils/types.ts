
// CHAT TYPES

// For different roles in the conversation
type Role = 'user' | 'model'

// For a part of a message
type Part = {
  text: string // The actual text content of the part
}

// For a message in the conversation
type Message = {
  role: Role // The role of the sender (user or model)
  parts: Part[] // An array of parts that make up the message
}

// For the conversation history, which is an array of messages
type History = Message[]


// PROMPT CARDS TYPES 

// For a prompt card item
type PromptCardItem = {
  icon: string // The icon to be displayed with the prompt card
  prompt: string // The actual prompt text
}

// For an array of prompt card items
type PromptCards = PromptCardItem[]


// AUTH TYPES

// Define the type for the user claims
type Claims = {
  name: string
  email: string
  picture: string
  sub: string
  email_verified: boolean
}

// Export the types
export type { History, Message,Claims, PromptCards,PromptCardItem }
