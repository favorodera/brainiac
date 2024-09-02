// Define the type for a prompt card item
type PromptCardItem = {
  icon: string // The icon to be displayed with the prompt card
  prompt: string // The actual prompt text
}

// Define the type for an array of prompt card items
type PromptCards = PromptCardItem[]

// Define an array of prompt card objects, each with an icon and a prompt
const promptCards: PromptCards = [
  // Each object represents a prompt card with an icon and a prompt
  {
    icon: 'i-heroicons-pencil-solid',
    prompt:
      'Write a customer service email to a customer who received a damaged product, offering a refund or replacement.',
  },
  {
    icon: 'i-heroicons-film-solid',
    prompt:
      'Write a short film script about a robot who falls in love with a human, exploring themes of AI and human connection.',
  },
  {
    icon: 'i-heroicons-code-solid',
    prompt:
      'Write Python code to scrape data from a website with pagination, including data extraction and cleaning.',
  },
  {
    icon: 'i-heroicons-document-text-solid',
    prompt:
      'Write a blog post about the benefits of AI in business, discussing use cases, challenges, and the future of AI.',
  },
  {
    icon: 'i-heroicons-presentation-chart-bar-solid',
    prompt:
      'Create a presentation deck for a new business venture, including a value proposition, target market analysis, and financial projections.',
  },
  {
    icon: 'i-heroicons-user-group-solid',
    prompt:
      'Write a speech about the importance of diversity and inclusion in the workplace, addressing benefits and how to create an inclusive environment.',
  },
  {
    icon: 'i-heroicons-globe-alt-solid',
    prompt:
      'Generate a travel itinerary for a two-week trip to Europe, including destinations, transportation, accommodation, and activities.',
  },
  {
    icon: 'i-heroicons-solid-code',
    prompt: 'Write a function in JavaScript to reverse a linked list.',
  },
  {
    icon: 'i-heroicons-solid-terminal',
    prompt:
      'Explain the difference between a SQL database and a NoSQL database, and provide examples of when you might choose one over the other.',
  },
  {
    icon: 'i-heroicons-bug-ant-solid',
    prompt:
      'Describe the process of debugging a web application, including common tools and techniques.',
  },
  {
    icon: 'i-heroicons-computer-desktop-solid',
    prompt:
      'Explain the concept of API design, including best practices for creating RESTful APIs.',
  },
  {
    icon: 'i-heroicons-server-solid',
    prompt:
      'Discuss the different types of cloud computing services (IaaS, PaaS, SaaS) and their use cases.',
  },
  {
    icon: 'i-heroicons-lock-closed-solid',
    prompt:
      'Explain the importance of cybersecurity and common threats like phishing, malware, and social engineering.',
  },
  {
    icon: 'i-heroicons-puzzle-piece-solid',
    prompt:
      'Describe the principles of object-oriented programming (OOP) and provide examples of OOP concepts in code.',
  },
  {
    icon: 'i-heroicons-chart-bar-square-solid',
    prompt:
      'Explain the role of data structures and algorithms in software development, and provide examples of common data structures',
  },
  {
    icon: 'i-mdi-git',
    prompt:
      'Describe the Git version control system, including common commands and workflows for collaborating on code.',
  },
  {
    icon: 'i-heroicons-rectangle-stack-solid',
    prompt:
      'Explain the concept of machine learning and provide examples of different machine learning algorithms.',
  },
  {
    icon: 'i-heroicons-star-solid',
    prompt:
      'Write a short story about a young girl who discovers a magical portal in her backyard, exploring themes of adventure and imagination.',
  },
  {
    icon: 'i-heroicons-microphone-solid',
    prompt:
      'Create a podcast script about the history of AI, discussing key milestones, influential figures, and the impact of AI on society.',
  },
  {
    icon: 'i-heroicons-book-open-solid',
    prompt:
      'Write a book review of a recent novel, analyzing the plot, characters, themes, and writing style.',
  },
  {
    icon: 'i-heroicons-musical-note-solid',
    prompt:
      'Compose a song about the beauty and power of nature, exploring themes of environmental conservation and human connection.',
  },
  {
    icon: 'i-heroicons-film-solid',
    prompt:
      'Write a screenplay for a road trip film about friendship, exploring themes of self-discovery and taking risks.',
  },
  {
    icon: 'i-heroicons-gift-solid',
    prompt:
      'Generate creative and thoughtful gift ideas for different occasions, considering the recipient\'s interests and budget.',
  },
  {
    icon: 'i-heroicons-chat-bubble-bottom-center-text-solid',
    prompt:
      'Write a dialogue between two characters with opposing viewpoints on a current social issue exploring the complexities of the issue.',
  },
  {
    icon: 'i-heroicons-chart-bar-solid',
    prompt:
      'Analyze market trends in a specific industry, identifying key drivers, challenges, and opportunities for growth.',
  },
  {
    icon: 'i-heroicons-user-solid',
    prompt:
      'Write a personal essay about a significant life experience that shaped your values and perspectives, reflecting on the lessons learned.',
  },
  {
    icon: 'i-heroicons-building-library-solid',
    prompt:
      'Create a research paper on a topic related to AI, exploring the latest advancements, ethical considerations, and potential future applications.',
  },
  {
    icon: 'i-heroicons-pencil-solid',
    prompt:
      'Write a short story about friends on a treasure hunt, exploring themes of friendship, teamwork, and following your dreams.',
  },
  {
    icon: 'i-heroicons-film-solid',
    prompt:
      'Create a screenplay about a young artist finding their voice, exploring themes of creativity, self-expression, and believing in yourself.',
  },
  {
    icon: 'i-heroicons-code-solid',
    prompt:
      'Generate JavaScript code for a simple web app with a database, including data storage, retrieval, and user authentication.',
  },
  {
    icon: 'i-heroicons-document-text-solid',
    prompt:
      'Write a blog post about the impact of social media on society, discussing benefits, drawbacks and  ethical considerations.',
  },
  {
    icon: 'i-heroicons-light-bulb-solid',
    prompt:
      'Brainstorm ideas for a new AI-powered business, considering the potential market, technology, and value proposition.',
  },
]

// Define an asynchronous event handler function for GET requests to the '/api/promptcards' endpoint
export default defineEventHandler(async () => {
  // Create a temporary copy of the prompt cards array to avoid modifying the original array
  const tempPromptCards = [...promptCards]

  // Shuffle the prompt cards array using the Fisher-Yates shuffle algorithm
  // This loop goes through each prompt card in the array
  for (let currentIndex = tempPromptCards.length - 1; currentIndex > 0; currentIndex--) {
    // Generate a random index between 0 and the current index
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    // Swap the prompt cards at the current index and the random index
    // This is like shuffling a deck of cards by swapping two cards at a time
    [tempPromptCards[currentIndex], tempPromptCards[randomIndex]] = [
      tempPromptCards[randomIndex],
      tempPromptCards[currentIndex],
    ]
  }

  // Return the first 4 elements of the shuffled array
  return tempPromptCards.slice(0, 4) 
})
