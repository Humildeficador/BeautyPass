import { createContext, useContext, useEffect, useState } from 'react'
import { getSocket } from '../services/socket'

type Message = {
  from: string
  to: string
  content: string
  timestamp: number
}

type MessagesMap = Record<string, Message[]>


interface ChatContextType {
  messages: MessagesMap
  sendMessage: (to: string, content: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<MessagesMap>({})


  useEffect(() => {
    const socket = getSocket()
    if (!socket) return
    socket.on('private-message', (msg: Message) => {
      setMessages(prev => ({
        ...prev,
        [msg.from]: [...(prev[msg.from] || []), msg]
      }))
    })

    return () => {
      socket.off('private-message')
    }
  }, [])

  const sendMessage = (to: string, content: string) => {
    console.log(to, content)
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used inside ChatProvider')
  return context
}