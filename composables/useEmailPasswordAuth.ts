import type { FormSubmitEvent } from "#ui/types";
import useSchemaStore from "~/store/schema";
import type { z } from "zod";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "~/app.vue";

createApp(App).use(createPinia());

const { signInSchema } = useSchemaStore();
type Schema = z.infer<typeof signInSchema>;

export const useEmailPasswordAuth = async (event: FormSubmitEvent<Schema>) => {
  useToast().add({
    id: "sign-in-credentials-check",
    title: "Signing In",
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
    const user = await $fetch("/api/emailpasswordauth", {
      method: "POST",
      body: {
        email: event.data.email,
        password: event.data.password,
      },
      onResponseError(error) {
        useToast().clear();
        useToast().add({
          id: "sign-in-error",
          title:
            error.response.status === 500
              ? "Invalid Credentials"
              : error.response.statusText,
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
    navigateTo("/chat");
    return user;
  } catch (error) {
    return error;
  }
};
