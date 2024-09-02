const textarea = document?.querySelector('textarea') // Get the textarea element
let temporary = '' // Temporary storage for the textarea value

/**
 * Sends a prompt to the Gemini API and handles the response.
 *
 * @param prompt - The prompt to send to the Brainiac API (powered by Gemini).
 */
export default async function (prompt: string) {
  // Return early if no prompt is provided.
  if (!prompt)
    return

  // Store the current textarea value and clear the textarea.
  if (textarea) {
    temporary = textarea.value
    textarea.value = ''
  }

  // Redirect to a specific chat route if the user is on the main chat route.
  if (useRoute().path === '/chat' || useRoute().path === '/chat/')
    await navigateTo('/chat/123')

  try {
    // Update the Brainiac Chat History Composable with the user's prompt.
    (await useBrainiac()).value.push({ role: 'user', parts: [{ text: prompt }] })

    // Send the prompt to the Brainiac API (powered by Gemini).
    const response = await $fetch('/api/brainiac', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    })

    // Update the Brainiac Chat History Composable with the API response.
    if (response) {
      (await useBrainiac()).value.push({ role: 'model', parts: [{ text: response }] })
    }

    // Clear the temporary storage.
    temporary = ''

    // Return the updated Brainiac Chat History Composable.
    return (await useBrainiac()).value
  }
  catch (error) {
    // Remove the last prompt from the Brainiac Chat Composable.
    (await useBrainiac()).value.pop()

    // Restore the previous textarea value.
    if (textarea)
      textarea.value = temporary

    // Return the error.
    return error
  }
}
