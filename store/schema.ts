import { defineStore } from "pinia";
import { z } from "zod";

const useSchemaStore = defineStore("schema", () => {
  type signInSchema = z.output<typeof signInSchema>;
  type signUpSchema = z.output<typeof signUpSchema>;

  const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const signUpSchema = z
    .object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  return {
    signInSchema,
    signUpSchema,
  };
});

export default useSchemaStore;
