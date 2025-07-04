import { useEffect, useState } from 'react'
import { socketInstance } from '../services/socket'
import type { UserSocketInfo } from '../types/userSocket'

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<UserSocketInfo[]>([])
  useEffect(() => {

    const socket = socketInstance()

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