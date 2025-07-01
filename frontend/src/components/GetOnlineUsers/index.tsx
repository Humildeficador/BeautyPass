import { useOnlineUsers } from '../../hooks/useOnlineUsers'

export const GetOnlineUsers = () => {
  const onlineUsers = useOnlineUsers()

  return (
    <div>
      {onlineUsers &&
        onlineUsers.map((user) => (
          <div key={user.userId}>{user.userInfo.firstName}</div>
        ))}
    </div>
  )

}