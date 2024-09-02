const useBrainiacStore = defineStore('brainiac', () => {
  // Define a reactive variable 'prompt' to store the user's input prompt
  const prompt = ref('')

  // Return the 'prompt' variable so it can be accessed from components
  return {

    prompt,
  }
})

// Export the store as the default export
export default useBrainiacStore
