import { FirebaseError } from "firebase/app";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "~/firebase/clientside";

export default async function (email: string, password: string) {
  const isAuthRunning = await useIsAuthRunning();
  isAuthRunning.passwordauth = true;

  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(credentials.user);
    isAuthRunning.passwordauth = false;

    useToast().add({
      id: "account-creation-success",
      title: "Account Created Successfully",
      description: "Redirecting to Verification Page...",
      icon: "i-streamline-user-identifier-card-solid",
      timeout: 3000,
      callback: async () => {
        await navigateTo("/authentication/verification");
      },
      closeButton: { icon: undefined },
      color: "emerald",
      ui: {
        ring: "ring-0",
        title: "text-sm dark:text-emerald-400 font-600",
        background: "dark:bg-#1e1f20 bg-#1e1f20",
      },
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        useToast().add({
          id: "account-already-exists",
          title: "Account Already Exists",
          description: "Redirecting to Sign In Page",
          icon: "i-heroicons-solid-exclamation-circle",
          timeout: 3000,
          callback: async () => {
            await navigateTo("/authentication/signin");
          },
          closeButton: { icon: undefined },
          color: "red",
          ui: {
            ring: "ring-0",
            title: "text-sm dark:text-red-400 font-600",
            background: "dark:bg-#1e1f20 bg-#1e1f20",
          },
        });
      } else if (error.code === "auth/network-request-failed") {
        useToast().add({
          id: "network-request-failed",
          title: "Network Error",
          description: "Please check your internet connection",
          icon: "i-heroicons-wifi-solid",
          timeout: 3000,
          closeButton: { icon: undefined },
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
          closeButton: { icon: undefined },
          color: "red",
          ui: {
            ring: "ring-0",
            title: "text-sm dark:text-red-400 font-600",
            background: "dark:bg-#1e1f20 bg-#1e1f20",
          },
        });
      } else {
        useToast().add({
          id: "account-creation-error",
          title: "Account Creation Error",
          description: "Please try again later",
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
    }
  } finally {
    isAuthRunning.passwordauth = false;
  }
}
