import { z } from 'zod' // Import the 'z' object from the 'zod' library for schema validation

// Define the 'useAuthSchemaStore' function, which is a Pinia store for authentication schemas
const useAuthSchemaStore = defineStore('auth-schema', () => {
  // Define types for sign-in and sign-up schemas using Zod's output type
  type signInSchema = z.output<typeof signInSchema>
  type signUpSchema = z.output<typeof signUpSchema>

  // Define the sign-in schema using Zod
  const signInSchema = z.object({
    // Define the 'email' field as a required string that must be a valid email address
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    // Define the 'password' field as a required string where the following rules apply:
    // - Must be at least 1 character long
    // - Must be at least 6 characters long
    // - Must contain at least one uppercase letter
    // - Must contain at least one lowercase letter
    // - Must contain at least one number
    // - Must contain at least one special character
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*~|:,.<>/?\\`'";:_+\-=]/,
        'Password must contain at least one special character',
      ),
  })

  // Define the sign-up schema using Zod
  const signUpSchema = z
    .object({
      // Define the 'email' field as a required string that must be a valid email address
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Enter a valid email'),
      // Define the 'password' field with the same validation rules as in the sign-in schema
      password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(
          /[!@#$%^&*~|:,.<>/?\\`'";:_+\-=]/,
          'Password must contain at least one special character',
        ),
      // Define the 'confirmPassword' field as a required string
      confirmPassword: z.string(),
      // Add a custom validation rule to ensure that the 'password' and 'confirmPassword' fields match
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match', // Error message if passwords don't match
      path: ['confirmPassword'], // Specify the field to display the error message for
    })

  // Return an object containing the sign-in and sign-up schemas
  return {
    signInSchema,
    signUpSchema,
  }
})

// Export the 'useAuthSchemaStore' function as the default export
export default useAuthSchemaStore
