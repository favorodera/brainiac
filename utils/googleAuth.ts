import { FirebaseError } from "firebase/app";
import AuthenticationModal from "~/components/Authentication/Modal.vue";

import {
  auth,
  getIdToken,
  inMemoryPersistence,
  provider,
  setPersistence,
  signInWithPopup,
} from "~/firebase/clientside";

export default async function () {
  // Open the authentication modal
  useModal().open(AuthenticationModal);

  try {
    // Set persistence to in memory
    await setPersistence(auth, inMemoryPersistence);

    // Sign in with Google popup
    const credentials = await signInWithPopup(auth, provider);

    // Get the ID token
    const idToken = await getIdToken(credentials.user);

    // Send the ID token and user's name to the backend for authentication
    await $fetch("/api/googleauth", {
      method: "POST",
      body: {
        idToken: idToken,
        name: credentials.user.displayName,
      },
    });

    // Close the authentication modal
    useModal().close();

    // Show success toast and redirect to chat page
    useToast().add({
      id: "account-creation-success",
      title: "Login Successful",
      description: "Initializing Brainiac...",
      icon: "i-streamline-user-identifier-card-solid",
      timeout: 3000,
      callback: async () => {
        await navigateTo("/chat");
      },
      closeButton: {
        icon: undefined,
      },
      color: "emerald",
      ui: {
        ring: "ring-0",
        title: "text-sm font-600",
        background: "dark:bg-#1e1f20",
      },
    });
    // Handle firebase errors
  } catch (error) {
    if (error instanceof FirebaseError) {
      useToast().add({
        id: "login-error",
        title: "Login Error",
        description: "An error occurred while logging in",
        icon: "i-heroicons-solid-exclamation-circle",
        timeout: 3000,
        closeButton: {
          icon: undefined,
        },
        color: "red",
        ui: {
          ring: "ring-0",
          title: "text-sm dark:text-red-400 font-600",
          background: "dark:bg-#1e1f20 bg-#1e1f20",
        },
      });
    }
  } finally {
    // Close the authentication modal
    useModal().close();
  }
}
