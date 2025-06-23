import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  provider: z.enum(['NORMAL', 'GOOGLE', 'GITHUB', 'FACEBOOK']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const tokenSchema = z.string().min(10)

export const loginResponseSchema = z.object({
  token: tokenSchema,
  user: userSchema
})

export type userPublic = z.infer<typeof userSchema>
export type tokenPublic = z.infer<typeof tokenSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>