import styles from './App.module.scss'
import { LoginButton } from './components/LoginButton'

export function App() {
  return (
    <div className={styles.container}>
      <div className={styles.loginGoogleButton}>
        <LoginButton />
      </div>
    </div>
  )
}