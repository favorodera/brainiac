import useErrorStore from "~/store/error";
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
  const { user, status } = await $fetch("/api/emailpasswordauth", {
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password,
    },
  });

  const { emailPasswordSignInError } = useErrorStore();
  emailPasswordSignInError.errorcode = status;

  return { user, status };
};
