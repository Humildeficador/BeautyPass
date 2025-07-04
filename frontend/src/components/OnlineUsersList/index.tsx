import { useOnlineUsers } from '../../context/OnlineUsersContext'
import { OnlineUserItem } from './OnlineUserItem'
import styles from './index.module.scss'

export const OnlineUsersList = () => {

  const onlineUsers = useOnlineUsers()

  return (
    <div className={styles.container}>
      <div className={styles.userList}>
        {onlineUsers &&
          onlineUsers.map((user) => (
            <OnlineUserItem user={user} key={user.userId} />
          ))}
      </div>
    </div>
  )

}