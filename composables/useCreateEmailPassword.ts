import type { FormSubmitEvent } from "#ui/types";

export const useCreateEmailPassword = async (event: FormSubmitEvent<any>) => {
  try {
    const user = await $fetch("/api/createemailpassword", {
      method: "POST",
      body: {
        email: event.data.email,
        password: event.data.password,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};
