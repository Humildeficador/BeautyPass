import { api } from "./index";

export const loginWithGoogle = async (token: string) => {
  const { data } = await api.post('/auth/callback', { token })
  return data
}