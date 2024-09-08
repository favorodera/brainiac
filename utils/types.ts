type Role = "user" | "model";

type Part = {
  text: string;
};

type Message = {
  role: Role;
  parts: Part[];
};

type ChatHistory = Message[];

type PromptCardItem = {
  icon: string;
  prompt: string;
};

type PromptCards = PromptCardItem[];

type Claims = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  email_verified: boolean;
};

export type { ChatHistory, Message, Claims, PromptCards, PromptCardItem };
