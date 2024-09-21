import { FirebaseError } from "firebase/app";
import { auth, sendPasswordResetEmail } from "~/firebase/clientside";

export default async function (email: string) {
  const isAuthRunning = await useIsAuthRunning();
  if (email === "") return;
  isAuthRunning.passwordreset = true;

  try {
    await sendPasswordResetEmail(auth, email);

    useToast().add({
      id: "password-reset-link-sent",
      title: "Password Reset Link Sent",
      description: "Please check your email",
      icon: "i-heroicons-lock-open-solid",
      timeout: 3000,
      closeButton: { icon: undefined },
      color: "emerald",
      ui: {
        ring: "ring-0",
        title: "text-sm dark:text-emerald-400 font-600",
        background: "dark:bg-#1e1f20 bg-#1e1f20",
      },
    });
    isAuthRunning.passwordreset = false;
    return;
  } catch (error) {
    isAuthRunning.passwordreset = false;
    if (error instanceof FirebaseError) {
      if (error.code === "auth/too-many-requests") {
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
      } else if (error.code === "auth/invalid-email") {
        useToast().add({
          id: "invalid-email",
          title: "Invalid Email",
          description: "Please enter a valid email",
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
      }
    } else {
      useToast().add({
        id: "password-reset-link-error",
        title: "Error Sending Password Reset Link",
        description: "Please try again",
        icon: "i-heroicons-lock-open-solid",
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
    return error;
  } finally {
    isAuthRunning.passwordreset = false;
  }
}
