import { createPinia } from "pinia";
import type { z } from "zod";
import { FirebaseError } from "firebase/app";
import {
  auth,
  getIdToken,
  inMemoryPersistence,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
} from "~/firebase/clientside";
import type { FormSubmitEvent } from "#ui/types";
import AuthenticationModal from "~/components/Authentication/Modal.vue";
import useAuthSchemaStore from "~/store/authSchemaStore";

// Get the signin schema from the auth schema store
const _signInSchema = useAuthSchemaStore(createPinia()).signInSchema;
type Schema = z.infer<typeof _signInSchema>;

export default async function (event: FormSubmitEvent<Schema>) {
  // Open the authentication modal
  useModal().open(AuthenticationModal);

  try {
    // Set persistence to in memory
    await setPersistence(auth, inMemoryPersistence);

    // Sign in with email and password
    const credentials = await signInWithEmailAndPassword(
      auth,
      event.data.email,
      event.data.password
    );

    // Check if email is verified
    if (!credentials.user.emailVerified) {
      // Send verification email
      sendEmailVerification(credentials.user);

      // Close the authentication modal
      useModal().close();

      // Show toast notification
      useToast().add({
        id: "account-not-verified",
        title: "Email Address Not Verified",
        description: "Click here to verify your email address",
        icon: "i-heroicons-solid-exclamation-circle",
        timeout: 0,
        color: "red",
        // Redirect to verification page on click
        click: async () => {
          await navigateTo("/authentication/verification");
        },
        ui: {
          ring: "ring-0",
          title: "text-sm dark:text-red-400 font-600",
          background: "dark:bg-#1e1f20 bg-#1e1f20",
        },
      });

      return;
    }

    // Get the ID token
    const idToken = await getIdToken(credentials.user);

    // Send the ID token to the backend for authentication
    await $fetch("/api/emailpasswordauth", {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
      }),
    });

    // Close the authentication modal
    useModal().close();

    // Show success toast and redirect to chat page
    useToast().add({
      id: "login-success",
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
        title: "text-sm dark:text-emerald-400 font-600",
        background: "bg-#1e1f20 dark:bg-#1e1f20",
      },
    });
    // Handle firebase errors
  } catch (error) {
    if (error instanceof FirebaseError) {
      // Handle invalid credentials error
      if (error.code === "auth/invalid-credential") {
        useToast().add({
          id: "invalid-credential",
          title: "Invalid Credentials",
          description: "Please check your email and password",
          icon: "i-heroicons-solid-shield-exclamation",
          timeout: 3000,
          closeButton: {
            icon: undefined,
          },
          color: "red",
          ui: {
            ring: "ring-0",
            title: "text-sm dark:text-red-400 font-600",
            background: "bg-#1e1f20 dark:bg-#1e1f20",
          },
        });
        // Handle network errors
      } else if (error.code === "auth/network-request-failed") {
        useToast().add({
          id: "network-request-failed",
          title: "Network Error",
          description: "Please check your internet connection",
          icon: "i-heroicons-wifi-solid",
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
        // Handle too many requests error
      } else if (error.code === "auth/too-many-requests") {
        useToast().add({
          id: "too-many-requests",
          title: "Too Many Requests",
          description: "Please try again later",
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
        // Handle other errors
      } else {
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
    }
  } finally {
    // Close the authentication modal
    useModal().close();
  }
}
