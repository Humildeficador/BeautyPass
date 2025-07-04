import { createContext, useContext, useEffect, useState } from 'react'
import type { UserSocketInfo } from '../types/userSocket'
import { socketInstance } from '../services/socket'
import equal from 'fast-deep-equal'

const OnlineUsersContext = createContext<UserSocketInfo[] | null>(null)

export const OnlineUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<UserSocketInfo[]>([])

  useEffect(() => {
    const socket = socketInstance()
    const handleOnlineUsers = (users: UserSocketInfo[]) => {
      setOnlineUsers(prev => equal(prev, users) ? prev : users)
    }

    socket.emit('request-online-users')
    socket.on('online-users', handleOnlineUsers)
    return () => {
      socket.off('online-users', handleOnlineUsers)
    }
  }, [])

  return (
    <OnlineUsersContext.Provider value={onlineUsers} >
      {children}
    </OnlineUsersContext.Provider>
  )
}

export const useOnlineUsers = () => {
  const context = useContext(OnlineUsersContext)
  if (context === null) throw new Error('useOnlineUsers must be used within OnlineUsersProvider')
  return context
}