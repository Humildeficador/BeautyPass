import styles from './App.module.scss'
import { LoginButton } from './components/LoginButton'
import { PrivateRoute } from './components/PrivateRoute'

export function App() {
  return (
    <div className={styles.container}>
      <div className={styles.loginGoogleButton}>
        <LoginButton />
        <PrivateRoute />
      </div>
    </div>
  )
}