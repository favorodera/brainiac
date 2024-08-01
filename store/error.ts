import { defineStore } from "pinia";

type StatusCode = {
  errorcode: number;
};

const useErrorStore = defineStore("error", () => {
  const emailPasswordSignInError = reactive<StatusCode>({ errorcode: 0 });

  const emailPasswordSignUpError = reactive<StatusCode>({
    errorcode: 0,
  });

  const googleAuthError = reactive<StatusCode>({
    errorcode: 0,
  });

  return {
    emailPasswordSignInError,
    emailPasswordSignUpError,
    googleAuthError,
  };
});

export default useErrorStore;
