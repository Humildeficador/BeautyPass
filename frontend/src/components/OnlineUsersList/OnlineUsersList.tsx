
import { useOnlineUsers } from '../../context/OnlineUsersContext'
import type { UserSocketInfo } from '../../types/userSocket'
import { OnlineUserItem } from './OnlineUserItem/OnlineUserItem'
import styles from './OnlineUserItem.module.scss'

type Props = {
  handleChatUserInfo: (userSocketInfo: UserSocketInfo) => void
}

export const OnlineUsersList = ({ handleChatUserInfo }: Props) => {
  const onlineUsers = useOnlineUsers()

  return (
    <div className={styles.container}>
      <div className={styles.userList}>
        {onlineUsers &&
          onlineUsers.map((user) => (
            <OnlineUserItem
              key={user.userId}
              user={user}
              handleChatUserInfo={handleChatUserInfo}
            />
          ))}
      </div>
    </div>
  )
}