import { createPinia } from 'pinia'
import type { z } from 'zod'
import { FirebaseError } from 'firebase/app'
import {
  auth,
  getIdToken,
  inMemoryPersistence,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
} from '~/firebase/clientside'
import type { FormSubmitEvent } from '#ui/types'
import AuthenticationModal from '~/components/Authentication/Modal.vue'
import useAuthSchemaStore from '~/store/authSchemaStore'

// Define the type for the sign-in form data
const _signInSchema = useAuthSchemaStore(createPinia()).signInSchema
type Schema = z.infer<typeof _signInSchema>

/**
 * Handles email/password authentication for the application.
 *
 * This function attempts to sign in a user using email and password.
 * It includes error handling for various Firebase authentication errors.
 *
 * @param {FormSubmitEvent<Schema>} event - The form submission event containing user credentials.
 */
export default async function (event: FormSubmitEvent<Schema>) {
  // Open the authentication modal
  useModal().open(AuthenticationModal)

  try {
    // Set Firebase authentication persistence to in-memory
    await setPersistence(auth, inMemoryPersistence)

    // Attempt to sign in with email and password
    const credentials = await signInWithEmailAndPassword(
      auth,
      event.data.email,
      event.data.password,
    )

    // Check if the user's email is verified
    if (credentials.user.emailVerified === false) {
      // Send email verification if not verified
      sendEmailVerification(credentials.user)

      // Close the authentication modal if email is unverified
      useModal().close()

      // Display a toast notification indicating email verification is required
      useToast().add({
        id: 'account-not-verified',
        title: 'Email Address Not Verified',
        description: 'Click here to verify your email address',
        icon: 'i-heroicons-solid-exclamation-circle',
        timeout: 0, // Persistent notification
        color: 'red',
        click: async () => {
          // Navigate to the email verification page on click
          await navigateTo('/authentication/verification')
        },
        ui: {
          ring: 'ring-0',
          title: 'text-sm dark:text-red-400 font-600',
          background: 'dark:bg-#1e1f20 bg-#1e1f20',
        },
      })

      // Stop further execution
      return
    }

    // Get the user's ID token
    const idToken = await getIdToken(credentials.user)

    // Send the ID token to the backend for server-side authentication
    await $fetch('/api/emailpasswordauth', {
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
      }),
    })

    // Close the authentication modal
    useModal().close()

    // Display a success toast notification if login is successful
    useToast().add({
      id: 'login-success',
      title: 'Login Successful',
      description: 'Initializing Brainiac...',
      icon: 'i-streamline-user-identifier-card-solid',
      timeout: 3000,
      callback: async () => {
        // Navigate to the chat page after successful login
        await navigateTo('/chat')
      },
      closeButton: {
        icon: undefined,
      },
      color: 'emerald',
      ui: {
        ring: 'ring-0',
        title: 'text-sm dark:text-emerald-400 font-600',
        background: 'bg-#1e1f20 dark:bg-#1e1f20',
      },
    })
  }
  catch (error) {
    // Handle Firebase authentication errors
    if (error instanceof FirebaseError) {
      // Handle specific error codes
      if (error.code === 'auth/invalid-credential') {
        // Invalid credentials error
        useToast().add({
          id: 'invalid-credential',
          title: 'Invalid Credentials',
          description: 'Please check your email and password',
          icon: 'i-heroicons-solid-shield-exclamation',
          timeout: 3000,
          closeButton: {
            icon: undefined,
          },
          color: 'red',
          ui: {
            ring: 'ring-0',
            title: 'text-sm dark:text-red-400 font-600',
            background: 'bg-#1e1f20 dark:bg-#1e1f20',
          },
        })
      }
      else if (error.code === 'auth/network-request-failed') {
        // Network error
        useToast().add({
          id: 'network-request-failed',
          title: 'Network Error',
          description: 'Please check your internet connection',
          icon: 'i-heroicons-wifi-solid',
          timeout: 3000,
          closeButton: {
            icon: undefined,
          },
          color: 'red',
          ui: {
            ring: 'ring-0',
            title: 'text-sm dark:text-red-400 font-600',
            background: 'dark:bg-#1e1f20 bg-#1e1f20',
          },
        })
      }
      else if (error.code === 'auth/too-many-requests') {
        // Too many requests error
        useToast().add({
          id: 'too-many-requests',
          title: 'Too Many Requests',
          description: 'Please try again later',
          icon: 'i-heroicons-solid-exclamation-circle',
          timeout: 3000,
          closeButton: {
            icon: undefined,
          },
          color: 'red',
          ui: {
            ring: 'ring-0',
            title: 'text-sm dark:text-red-400 font-600',
            background: 'dark:bg-#1e1f20 bg-#1e1f20',
          },
        })
      }
      else {
        // Generic login error
        useToast().add({
          id: 'login-error',
          title: 'Login Error',
          description: 'An error occurred while logging in',
          icon: 'i-heroicons-solid-exclamation-circle',
          timeout: 3000,
          closeButton: {
            icon: undefined,
          },
          color: 'red',
          ui: {
            ring: 'ring-0',
            title: 'text-sm dark:text-red-400 font-600',
            background: 'dark:bg-#1e1f20 bg-#1e1f20',
          },
        })
      }
    }
  }
  finally {
    // Ensure the authentication modal is closed
    useModal().close()
  }
}
