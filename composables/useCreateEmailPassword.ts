import useErrorStore from "~/store/error";

export const useCreateEmailPassword = async (
  email: string | undefined,
  password: string | undefined,
) => {
  const { user, status } = await $fetch("/api/createemailpassword", {
    method: "POST",
    body: {
      email: email,
      password: password,
    },
  });

  const { emailPasswordSignUpError } = useErrorStore();
  emailPasswordSignUpError.errorcode = status;

  return { user, status };
};
