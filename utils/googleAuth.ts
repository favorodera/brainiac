// Import Firebase client functions
import AuthenticationModal from '~/components/Authentication/Modal.vue' // Import AuthenticationModal component

import {
  auth, // Firebase authentication instance
  getIdToken, // Function to get the user's ID token
  inMemoryPersistence, // In-memory persistence setting for Firebase authentication
  provider, // GoogleAuthProvider instance
  setPersistence, // Function to set the persistence mechanism for Firebase authentication
  signInWithPopup, // Function to initiate sign-in with a popup window
} from '~/firebase/clientside'

/**
 * Handles Google authentication for the application.
 *
 * This function attempts to sign in a user using Google authentication.
 * It includes error handling and redirects the user to the chat page upon successful login.
 */
export default async function () {
  // Open the authentication modal
  useModal().open(AuthenticationModal)

  try {
    // Set Firebase authentication persistence to in-memory
    await setPersistence(auth, inMemoryPersistence)

    // Initiate sign-in with Google using a popup window
    const credentials = await signInWithPopup(auth, provider)

    // Get the user's ID token after successful sign-in
    const idToken = await getIdToken(credentials.user)

    // Send the ID token and user's name to the backend for server-side authentication
    await $fetch('/api/googleauth', {
      method: 'POST',
      body: {
        idToken: idToken,
        name: credentials.user.displayName,
      },
    })

    // Close the authentication modal
    useModal().close()

    // Display a success toast notification
    useToast().add({
      id: 'account-creation-success',
      title: 'Login Successful',
      description: 'Initializing Brainiac...',
      icon: 'i-streamline-user-identifier-card-solid',
      timeout: 3000,
      callback: async () => {
        await navigateTo('/chat')
      },
      closeButton: {
        icon: undefined,
      },
      color: 'emerald',
      ui: {
        ring: 'ring-0',
        title: 'text-sm font-600',
        background: 'dark:bg-#1e1f20',
      },
    })
  }
  catch (error) {
    // Return the error object
    return error
  }
  finally {
    // Ensure the authentication modal is closed, even if an error occurred
    useModal().close()
  }
}
