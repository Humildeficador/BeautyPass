import { useEffect, useState } from 'react'
import { getSocket } from '../services/socket'
import type { UserSocketInfo } from '../types/userSocket'

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserSocketInfo[]>()
  useEffect(() => {
    const socket = getSocket()

    if (!socket) return

    const handleOnlineUsers = (users: UserSocketInfo[]) => {
      setOnlineUsers(users)
    }

    socket.on('online-users', handleOnlineUsers)

    return () => {
      socket.off('online-users', handleOnlineUsers)
    }
  }, [])

  return onlineUsers
}