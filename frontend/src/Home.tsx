import styles from './App.module.scss'
import { Chat } from './components/Chat'
import { OnlineUsersList } from './components/OnlineUsersList'
import { useAuth } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'

export const Home = () => {
  const { logout } = useAuth()
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