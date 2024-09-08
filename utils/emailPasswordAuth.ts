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

const _signInSchema = useAuthSchemaStore(createPinia()).signInSchema;
type Schema = z.infer<typeof _signInSchema>;

export default async function (event: FormSubmitEvent<Schema>) {
  useModal().open(AuthenticationModal);

  try {
    await setPersistence(auth, inMemoryPersistence);

    const credentials = await signInWithEmailAndPassword(
      auth,
      event.data.email,
      event.data.password
    );

    if (!credentials.user.emailVerified) {
      sendEmailVerification(credentials.user);

      useModal().close();

      useToast().add({
        id: "account-not-verified",
        title: "Email Address Not Verified",
        description: "Click here to verify your email address",
        icon: "i-heroicons-solid-exclamation-circle",
        timeout: 0,
        color: "red",
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

    const idToken = await getIdToken(credentials.user);

    await $fetch("/api/emailpasswordauth", {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
      }),
    });

    useModal().close();

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
  } catch (error) {
    if (error instanceof FirebaseError) {
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
    useModal().close();
  }
}
