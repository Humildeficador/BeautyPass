import styles from './App.module.scss'
import { ButtonToPrivateRoute } from './components/ButtonToPrivateRoute'
import { LoginButton } from './components/LoginButton'
import { useAuth } from './context/AuthContext'


export function App() {
  const { isLoggedIn } = useAuth()
  return (
    <div className={styles.container}>
      <div className={styles.loginGoogleButton}>
        <LoginButton />
        {!isLoggedIn ? <ButtonToPrivateRoute /> : ''}
      </div>
    </div>
  )
}