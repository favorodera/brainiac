import useErrorStore from "~/store/error";
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
  const { user, status } = await $fetch("/api/createemailpassword", {
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password,
    },
  });

  const { emailPasswordSignUpError } = useErrorStore();
  emailPasswordSignUpError.errorcode = status;

  return { user, status };
};
