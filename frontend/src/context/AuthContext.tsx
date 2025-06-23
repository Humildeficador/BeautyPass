import { createContext, useContext, useEffect, useState } from 'react'
import { tokenSchema, userSchema, type tokenPublic, type userPublic } from '../schemas/loginResponse'
import { api } from '../api'

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

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      try {
        const parsedUser = userSchema.parse(JSON.parse(storedUser))
        const parsedToken = tokenSchema.parse(storedToken)

        setUser(parsedUser)

        if (storedToken) {
          api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            }
          })
            .then(res => {
              const validatedUser = userSchema.parse(res.data.user)
              setUser(validatedUser)
              setToken(parsedToken)
              localStorage.setItem('user', JSON.stringify(validatedUser))
            })
            .catch(() => {
              logout()
            })
        }

      } catch (err) {
        console.warn('Dados inválidos no localStorage, limpando...' + err)
        logout()
      }
    }
  }, [])

  const login = (newUser: userPublic, newToken: tokenPublic) => {
    setUser(newUser)
    setToken(newToken)

    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}