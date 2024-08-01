import useErrorStore from "~/store/error";

export const useGoogleAuth = async () => {
  const { user, status } = await $fetch("/api/googleauth", {
    method: "POST",
  });
  const { googleAuthError } = useErrorStore();
  googleAuthError.errorcode = status;

  return { user, status };
};
