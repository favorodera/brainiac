import { FirebaseError } from "firebase/app";
import {
  auth,
  getIdToken,
  inMemoryPersistence,
  provider,
  setPersistence,
  signInWithPopup,
} from "~/firebase/clientside";

export default async function () {
  const isAuthRunning = await useIsAuthRunning();
  isAuthRunning.googleauth = true;

  try {
    await setPersistence(auth, inMemoryPersistence);
    const credentials = await signInWithPopup(auth, provider);
    const idToken = await getIdToken(credentials.user);

    await $fetch("/api/googleauth", {
      method: "POST",
      body: {
        idToken,
        name: credentials.user.displayName,
      },
    });

    isAuthRunning.googleauth = false;

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
  } catch (error) {
    if (error instanceof FirebaseError) {
      useToast().add({
        id: "login-error",
        title: "Login Error",
        description: "An error occurred while logging in",
        icon: "i-heroicons-solid-exclamation-circle",
        timeout: 3000,
        closeButton: { icon: undefined },
        color: "red",
        ui: {
          ring: "ring-0",
          title: "text-sm dark:text-red-400 font-600",
          background: "dark:bg-#1e1f20 bg-#1e1f20",
        },
      });
    }
  } finally {
    isAuthRunning.googleauth = false;
  }
}
