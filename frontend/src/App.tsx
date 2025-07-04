import { useEffect } from 'react'
import styles from './App.module.scss'
import { GoogleLoginButton } from './components/LoginButton'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router'


export function App() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.loginGoogleButton}>
        <GoogleLoginButton />
      </div>
    </div>
  )
}