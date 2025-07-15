import styles from './OnlineUserItem.module.scss'
import type { OnlineUserInfo } from '../../types/user'
import { OnlineUserItem } from './OnlineUserItem/OnlineUserItem'
import { useOnlineUsers } from '../../context/OnlineUsersContext'

type Props = {
  handleChatUserInfo: (onlineUserInfo: OnlineUserInfo) => void
}

export const OnlineUsersList = ({ handleChatUserInfo }: Props) => {
  const onlineUsers = useOnlineUsers()

  return (
    <div className={styles.container}>
      <div className={styles.userList}>
        {onlineUsers &&
          onlineUsers.map((user) => (
            <OnlineUserItem
              key={user.publicId}
              onlineUser={user}
              handleChatUserInfo={handleChatUserInfo}
            />
          ))}
      </div>
    </div>
  )
}