import equal from 'fast-deep-equal'
import type { OnlineUserInfo } from '../types/user'
import { socketInstance } from '../services/socket'
import { createContext, useContext, useEffect, useState } from 'react'

const OnlineUsersContext = createContext<OnlineUserInfo[] | null>(null)

export const OnlineUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUserInfo[]>([])

  useEffect(() => {
    const socket = socketInstance()
    const handleOnlineUsers = (users: OnlineUserInfo[]) => {
      setOnlineUsers(prev => equal(prev, users) ? prev : users)
    }

    socket.emit('get-online-users')
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