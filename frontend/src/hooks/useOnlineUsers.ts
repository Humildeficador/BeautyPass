import { useEffect, useState } from 'react'
import { getSocket } from '../services/socket'

type OnlineUser = {
  userId: string
  userInfo: {
    firstName: string
    lastName: string
  }
  sockets: string[]
}

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>()
  useEffect(() => {
    const socket = getSocket()

    if (!socket) return

    const handleOnlineUsers = (users: OnlineUser[]) => {
      setOnlineUsers(users)
    }

    socket.on('online-users', handleOnlineUsers)

    return () => {
      socket.off('online-users', handleOnlineUsers)
    }
  }, [])

  return onlineUsers
}