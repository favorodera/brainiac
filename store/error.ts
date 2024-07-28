import { defineStore } from "pinia";
import type { FormError } from "#ui/types";

type StatusCode = {
  errorcode: number;
};

const useErrorStore = defineStore("error", () => {
  const emailPasswordSignInError = ref<StatusCode>({
    errorcode: 0,
  });
  const emailPasswordSignUpError = ref<StatusCode>({
    errorcode: 0,
  });

  const googleAuthError = ref<StatusCode>({
    errorcode: 0,
  });

  return {
    emailPasswordSignInError,
    emailPasswordSignUpError,
    googleAuthError,
  };
});

export default useErrorStore;
