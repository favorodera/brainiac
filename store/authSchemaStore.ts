import { z } from 'zod' 
import { defineStore } from 'pinia'

const useAuthSchemaStore = defineStore('auth-schema', () => {
  type signInSchema = z.output<typeof signInSchema>
  type signUpSchema = z.output<typeof signUpSchema>

  const signInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*~|:,.<>/?\`'";:_+\-=]/,
        'Password must contain at least one special character',
      ),
  })

  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Enter a valid email'),
      password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(
          /[!@#$%^&*~|:,.<>/?\`'";:_+\-=]/,
          'Password must contain at least one special character',
        ),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match', 
      path: ['confirmPassword'], 
    })

  return {
    signInSchema,
    signUpSchema,
  }
})

export default useAuthSchemaStore
