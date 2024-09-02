import { FirebaseError } from 'firebase/app' // Import FirebaseError type for error handling
import { createPinia } from 'pinia' // Import createPinia function from Pinia
import type { z } from 'zod' // Import z type from zod for schema validation
import {
  auth, // Firebase authentication instance
  createUserWithEmailAndPassword, // Function to create a user with email and password
  sendEmailVerification, // Function to send email verification
} from '~/firebase/clientside' // Import Firebase client functions
import AuthenticationModal from '~/components/Authentication/Modal.vue' // Import AuthenticationModal component
import useAuthSchemaStore from '~/store/authSchemaStore' // Import useAuthSchemaStore from Pinia store
import type { FormSubmitEvent } from '#ui/types' // Import FormSubmitEvent type

// Get the sign-up schema from the authentication schema store
const _signUpSchema = useAuthSchemaStore(createPinia()).signUpSchema
// Define the Schema type using zod's infer function
type Schema = z.infer<typeof _signUpSchema>

/**
 * This function attempts to create a new user using email and password.
 * It includes error handling for various Firebase authentication errors.
 *
 * @param {FormSubmitEvent<Schema>} event - The form submission event containing user credentials.
 */

export default async function (event: FormSubmitEvent<Schema>) {
  useModal().open(AuthenticationModal) // Open the authentication modal
  try {
    // Attempt to create a new user with the provided email and password
    const credentials = await createUserWithEmailAndPassword(
      auth,
      event.data.email,
      event.data.password,
    )

    // Send a verification email to the newly created user
    await sendEmailVerification(credentials.user)

    // Close the authentication modal
    useModal().close()

    // Display a success toast notification if account creation is successful
    useToast().add({
      id: 'account-creation-success',
      title: 'Account Created Successfully',
      description: 'Redirecting to Verification Page...',
      icon: 'i-streamline-user-identifier-card-solid',
      timeout: 3000, // Timeout after 3 seconds
      callback: async () => {
        // Navigate to the email verification page after the toast disappears
        await navigateTo('/authentication/verification')
      },
      closeButton: {
        icon: undefined,
      },
      color: 'emerald',
      ui: {
        ring: 'ring-0',
        title: 'text-sm dark:text-emerald-400 font-600',
        background: 'dark:bg-#1e1f20 bg-#1e1f20',
      },
    })
  }
  catch (error) {
    // Handle errors during account creation
    if (error instanceof FirebaseError) {
      // Check if the error is a FirebaseError
      if (error.code === 'auth/email-already-in-use') {
        // Handle case where the email is already in use
        useToast().add({
          id: 'account-already-exists',
          title: 'Account Already Exists',
          description: 'Redirecting to Sign In Page',
          icon: 'i-heroicons-solid-exclamation-circle',
          timeout: 3000,
          callback: async () => {
            // Redirect to the sign-in page after the toast disappears
            await navigateTo('/authentication/signin')
          },
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
      else if (error.code === 'auth/network-request-failed') {
        // Handle case where there's a network error
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
        // Handle case where there are too many requests
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
        // Handle other Firebase errors
        useToast().add({
          id: 'account-creation-error',
          title: 'Account Creation Error',
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
    }
  }
  finally {
    // Ensure the authentication modal is closed, even if an error occurred
    useModal().close()
  }
}
