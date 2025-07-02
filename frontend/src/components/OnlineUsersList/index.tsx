import { useHandleUserMessages } from '../../hooks/useHandleUserMessages'
import { useOnlineUsers } from '../../hooks/useOnlineUsers'
import { OnlineUserItem } from './OnlineUserItem'
import styles from './index.module.scss'

export const OnlineUsersList = () => {
  const onlineUsers = useOnlineUsers()
  const { messages } = useHandleUserMessages()
  console.log(messages)

  return (
    <div className={styles.container}>
      <div className={styles.userList}>
        {onlineUsers &&
          onlineUsers.map((user) => (
            <OnlineUserItem user={user} key={user.userInfo.firstName} />
          ))}
      </div>
    </div>
  )

}