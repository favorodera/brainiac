import { PromptCards } from "~/utils/types";

const promptCards: PromptCards = [
  {
    icon: "i-heroicons-pencil-solid",
    prompt: "Write a customer service email for a damaged product.",
  },
  {
    icon: "i-heroicons-film-solid",
    prompt: "Write a short film script about a robot falling in love with a human.",
  },
  {
    icon: "i-heroicons-code-solid",
    prompt: "Write Python code to scrape a website with pagination.",
  },
  {
    icon: "i-heroicons-document-text-solid",
    prompt: "Write a blog post on AI's benefits in business.",
  },
  {
    icon: "i-heroicons-presentation-chart-bar-solid",
    prompt: "Create a presentation deck for a new business venture.",
  },
  {
    icon: "i-heroicons-user-group-solid",
    prompt: "Write a speech about diversity and inclusion in the workplace.",
  },
  {
    icon: "i-heroicons-globe-alt-solid",
    prompt: "Generate a 2-week Europe travel itinerary.",
  },
  {
    icon: "i-heroicons-solid-code",
    prompt: "Write a JavaScript function to reverse a linked list.",
  },
  {
    icon: "i-heroicons-solid-terminal",
    prompt: "Explain the difference between SQL and NoSQL databases.",
  },
  {
    icon: "i-heroicons-bug-ant-solid",
    prompt: "Describe the process of debugging a web application.",
  },
  {
    icon: "i-heroicons-computer-desktop-solid",
    prompt: "Explain the concept of API design, including RESTful API best practices.",
  },
  {
    icon: "i-heroicons-server-solid",
    prompt: "Discuss the different types of cloud computing services.",
  },
  {
    icon: "i-heroicons-lock-closed-solid",
    prompt: "Explain the importance of cybersecurity and common threats.",
  },
  {
    icon: "i-heroicons-puzzle-piece-solid",
    prompt: "Describe object-oriented programming (OOP) principles.",
  },
  {
    icon: "i-heroicons-chart-bar-square-solid",
    prompt: "Explain the role of data structures and algorithms.",
  },
  {
    icon: "i-mdi-git",
    prompt: "Describe the Git version control system.",
  },
  {
    icon: "i-heroicons-rectangle-stack-solid",
    prompt: "Explain machine learning and provide examples of algorithms.",
  },
  {
    icon: "i-heroicons-star-solid",
    prompt: "Write a short story about a young girl who discovers a magical portal.",
  },
  {
    icon: "i-heroicons-microphone-solid",
    prompt: "Create a podcast script about the history of AI.",
  },
  {
    icon: "i-heroicons-book-open-solid",
    prompt: "Write a book review of a recent novel.",
  },
  {
    icon: "i-heroicons-musical-note-solid",
    prompt: "Compose a song about the beauty and power of nature.",
  },
  {
    icon: "i-heroicons-film-solid",
    prompt: "Write a screenplay for a road trip film about friendship.",
  },
  {
    icon: "i-heroicons-gift-solid",
    prompt: "Generate creative gift ideas for different occasions.",
  },
  {
    icon: "i-heroicons-chat-bubble-bottom-center-text-solid",
    prompt: "Write a dialogue between two characters with opposing viewpoints.",
  },
  {
    icon: "i-heroicons-chart-bar-solid",
    prompt: "Analyze market trends in a specific industry.",
  },
  {
    icon: "i-heroicons-user-solid",
    prompt: "Write a personal essay about a significant life experience.",
  },
  {
    icon: "i-heroicons-building-library-solid",
    prompt: "Create a research paper on a topic related to AI.",
  },
  {
    icon: "i-heroicons-pencil-solid",
    prompt: "Write a short story about friends on a treasure hunt.",
  },
  {
    icon: "i-heroicons-film-solid",
    prompt: "Create a screenplay about a young artist finding their voice.",
  },
  {
    icon: "i-heroicons-code-solid",
    prompt: "Generate JavaScript code for a simple web app with a database.",
  },
  {
    icon: "i-heroicons-document-text-solid",
    prompt: "Write a blog post about the impact of social media.",
  },
  {
    icon: "i-heroicons-light-bulb-solid",
    prompt: "Brainstorm ideas for a new AI-powered business.",
  },
];
export default defineEventHandler(() => {
  const shuffled = promptCards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
});
