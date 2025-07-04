/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { UserSocketInfo } from '../types/userSocket'
import { socketInstance } from '../services/socket'
// import equal from 'fast-deep-equal'

const OnlineUsersContext = createContext<UserSocketInfo[] | null>(null)

export const OnlineUsersProvider = ({ children }: { children: ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<UserSocketInfo[]>([])


  const socket = socketInstance()
  useEffect(() => {
    const handleOnlineUsers = (users: UserSocketInfo[]) => {
      // setOnlineUsers(prev => (equal(prev, onlineUsers) ? prev : users))
      
      setOnlineUsers(prev => (
        JSON.stringify(prev) === JSON.stringify(users) ? prev : users
      ))
    }

    socket.on('online-users', handleOnlineUsers)

    return () => {
      socket.off('online-users', handleOnlineUsers)
    }
  }, [])

  return (
    <OnlineUsersContext.Provider value={onlineUsers}>
      {children}
    </OnlineUsersContext.Provider>
  )
}

export const useOnlineUsers = () => {
  const context = useContext(OnlineUsersContext)
  if (context === null) throw new Error('useOnlineUsers must be used within OnlineUsersProvider')
  return context
}