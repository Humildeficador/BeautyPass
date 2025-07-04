import { type ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router'

type Props = {
  children: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }
  return <>{children}</>
}