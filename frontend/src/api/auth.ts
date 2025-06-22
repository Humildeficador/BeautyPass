import { api } from './index'

export const loginWithGoogle = async (credential: string) => {
  const { data } = await api.post('/auth/google/callback', { token: credential })
  const { token, user } = data

  localStorage.setItem('token', token)

  return user
}