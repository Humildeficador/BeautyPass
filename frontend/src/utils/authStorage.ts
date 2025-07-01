import {
  tokenSchema,
  userSchema,
  type tokenPublic,
  type userPublic
} from '../schemas/loginResponse'

const USER_KEY = 'user'
const TOKEN_KEY = 'token'

export const saveSession = (user: userPublic, token: tokenPublic) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  localStorage.setItem(TOKEN_KEY, token)
}

export const loadSession = () => {
  const user = localStorage.getItem(USER_KEY)
  const token = localStorage.getItem(TOKEN_KEY)

  if (!user || !token) return null

  const parsedUser = userSchema.safeParse(JSON.parse(user))
  const parsedToken = tokenSchema.safeParse(token)

  if (!parsedUser.success || !parsedToken.success) return null

  return {
    parsedUser: parsedUser.data,
    parsedToken: parsedToken.data
  }
}

export const clearSession = () => {
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
}