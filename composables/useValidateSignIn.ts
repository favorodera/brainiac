import type { FormError } from "#ui/types";
import useErrorStore from "~/store/error";

export const useValidateSignIn = (state: any): FormError[] => {
  const { email, password } = state;
  const { signInFormError } = useErrorStore();

  if (!email) {
    signInFormError[0] = { path: "email", message: "Email is required" };
  } else if (!email.includes("@")) {
    signInFormError[0] = { path: "email", message: "Invalid email address" };
  } else if (!email.includes(".")) {
    signInFormError[0] = { path: "email", message: "Invalid email address" };
  } else if (email.includes("@") && email.includes(".")) {
    signInFormError[0] = { path: "", message: "" };
  }

  if (!password) {
    signInFormError[0] = { path: "password", message: "Password is required" };
  } else if (password.length < 6) {
    signInFormError[0] = {
      path: "password",
      message: "Password must be at least 6 characters",
    };
  }

  return signInFormError;
};
