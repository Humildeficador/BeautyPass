import { createContext, useContext, useState } from 'react'
import { useRestoreSession } from '../hooks/useRestoreSession'
import { clearSession, saveSession } from '../utils/authStorage'
import { initSocket, disconnectSocket } from '../services/socket'
import { type tokenPublic, type userPublic } from '../schemas/loginResponse'

type AuthContextType = {
  user: userPublic | null
  token: tokenPublic | null
  isLoggedIn: boolean
  login: (user: userPublic, token: tokenPublic,) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userPublic | null>(null)
  const [token, setToken] = useState<tokenPublic | null>(null)
  const [loading, setLoading] = useState(true)

  const login = (newUser: userPublic, newToken: tokenPublic) => {
    setUser(newUser)
    setToken(newToken)

    saveSession(newUser, newToken)

    initSocket(newToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    clearSession()

    disconnectSocket()
  }

  useRestoreSession({
    setUser,
    setToken,
    logout,
    onFinish: () => setLoading(false)
  })


  return (
    <AuthContext.Provider value={
      { user, token, isLoggedIn: !!token, login, logout }
    }>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}