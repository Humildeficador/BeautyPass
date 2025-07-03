/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { userSchema, type tokenPublic, type userPublic } from '../schemas/loginResponse'
import { initSocket } from '../services/socket'
import { api } from '../api'
import { loadSession, saveSession } from '../utils/authStorage'

type Params = {
  setUser: (user: userPublic) => void
  setToken: (user: tokenPublic) => void
  logout: () => void
}

export const useRestoreSession = ({ setUser, setToken, logout }: Params) => {
  useEffect(() => {
    const restore = async () => {

      const session = loadSession()!

      if (!session) return logout()

      const { parsedToken } = session

      try {
        const { data } = await api.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${parsedToken}`
          }
        })

        const validatedUser = userSchema.parse(data.user)

        setUser(validatedUser)
        setToken(parsedToken)

        saveSession(validatedUser, parsedToken)

        initSocket(parsedToken)
      }

      catch {
        logout()
      }
    }

    restore()
  }, [])
}