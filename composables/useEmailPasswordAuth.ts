import useErrorStore from "~/store/error";

export const useEmailPasswordAuth = async (
  email: string | undefined,
  password: string | undefined,
) => {
  const { user, status } = await $fetch("/api/emailpasswordauth", {
    method: "POST",
    body: {
      email,
      password,
    },
  });

  const { emailPasswordSignInError } = useErrorStore();
  emailPasswordSignInError.errorcode = status;

  return { user, status };
};
