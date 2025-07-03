import styles from './App.module.scss'
import { Chat } from './components/Chat'
import { LoginButton } from './components/LoginButton'
import { OnlineUsersList } from './components/OnlineUsersList'
import { useAuth } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'


export function App() {
  const { isLoggedIn, logout } = useAuth()

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <button onClick={logout} className={styles.logout}>X</button>
        <ChatProvider>
          <OnlineUsersList />
          <Chat />
        </ChatProvider>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginGoogleButton}>
        <LoginButton />
      </div>
    </div>
  )
}