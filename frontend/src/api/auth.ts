import { api } from './index'
import { loginResponseSchema } from '../schemas/loginResponse'

export const loginWithGoogle = async (credential: string) => {
  const res = await api.post('/auth/google/callback', { token: credential })

  const data = loginResponseSchema.parse(res.data)

  return data
}