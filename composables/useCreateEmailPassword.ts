import type { FormSubmitEvent } from "#ui/types";
import useSchemaStore from "~/store/schema";
import type { z } from "zod";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "~/app.vue";

createApp(App).use(createPinia());

const { signUpSchema } = useSchemaStore();
type Schema = z.infer<typeof signUpSchema>;

export const useCreateEmailPassword = async (
  event: FormSubmitEvent<Schema>,
) => {
  useToast().add({
    id: "sign-up-credentials-check",
    title: "Creating Account",
    description: "Please Wait...",
    icon: "i-svg-spinners-blocks-wave",
    timeout: 0,
    closeButton: {
      icon: undefined,
    },
    ui: {
      ring: "dark:ring-transparent",
      background: "dark:bg-#1e1f20",
      title: "text-5 font-bold  dark:text-indigo-400",
      description: "text-4 font-medium dark:text-indigo-600",
      icon: {
        color: "dark:text-indigo-400",
      },
      progress: {
        background: "dark:bg-indigo-400",
      },
    },
  });
  try {
    const user = await $fetch("/api/createemailpassword", {
      method: "POST",
      body: {
        email: event.data.email,
        password: event.data.password,
      },
      onResponseError(error) {
        useToast().clear();
        useToast().add({
          id: "sign-up-error",
          title:
            error.response.status === 500
              ? "User already exists"
              : error.response.statusText,
          description: "Please login",
          icon: "i-bxs-error-alt",
          timeout: 5000,
          closeButton: {
            icon: "i-heroicons-archive-box-x-mark",
            color: "red",
            variant: "outline",
          },
          ui: {
            ring: "dark:ring-transparent",
            background: "dark:bg-#1e1f20",
            title: "text-5 font-bold dark:text-red-400",
            icon: {
              color: "dark:text-red-400",
            },
            progress: {
              background: "dark:bg-red-400",
            },
          },
        });
      },
    });
    useToast().clear();
    useToast().add({
      id: "sign-up-success",
      title: "Account Created!",
      icon: "i-heroicons-identification-solid",
      timeout: 3000,
      closeButton: {
        icon: "i-heroicons-archive-box-x-mark",
        color: "green",
        variant: "outline",
      },
      ui: {
        ring: "dark:ring-transparent",
        background: "dark:bg-#1e1f20",
        title: "text-5 font-bold  dark:text-green",
        icon: {
          color: "dark:text-green",
        },
        progress: {
          background: "dark:bg-green-400",
        },
      },
      callback: () => navigateTo("/authentication/signin"),
    });
    return user;
  } catch (error) {
    return error;
  }
};
