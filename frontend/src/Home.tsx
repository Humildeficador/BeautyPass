import styles from './App.module.scss'
import { Users } from './components/Users/Users'
import { useAuth } from './context/AuthContext'

export const Home = () => {
  const { logout } = useAuth()
  return (
    <div className={styles.container}>
      <button onClick={logout} className={styles.logout}>X</button>
      <Users />
    </div>
  )
}