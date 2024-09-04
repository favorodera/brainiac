import type { History } from "~/utils/types"; // Import the History type from the utils/types.ts file

// Create a reactive reference to store the Gemini conversation history
// Initially, it's undefined as the history is fetched asynchronously
const brainiac = ref<History>([]);

// Define a composable function to access the Gemini conversation history
export default async function () {
  // Return the reactive reference to the Gemini conversation history
  return brainiac;
};
