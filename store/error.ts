import { defineStore } from "pinia";

type ErrorStatus = {
  errorstatus: number | string;
};

const useErrorStore = defineStore("error", () => {
  const emailPasswordSignInError = reactive<ErrorStatus>({ errorstatus: 0 });

  const emailPasswordSignUpError = reactive<ErrorStatus>({
    errorstatus: 0,
  });

  const googleAuthError = reactive<ErrorStatus>({
    errorstatus: 0,
  });

  return {
    emailPasswordSignInError,
    emailPasswordSignUpError,
    googleAuthError,
  };
});

export default useErrorStore;
