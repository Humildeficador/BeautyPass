/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'
import { socketInstance } from '../services/socket'

type Message = {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: string
}

type MessagesMap = Record<string, Message[]>


interface ChatContextType {
  conversations: MessagesMap
  sendMessage: (to: string, content: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<MessagesMap>({})
  const socket = socketInstance()

  useEffect(() => {
    const handleMessage = (message: Message) => {
      setConversations(prev => ({
        ...prev,
        [message.conversationId]: [
          ...(prev[message.conversationId] || []),
          message
        ]
      }))
    }

    socket.on('new-private-message', handleMessage)

    return () => {
      socket.off('new-private-message', handleMessage)
    }
  }, [])

  const sendMessage = (to: string, content: string) => {
    const messageInfo = {
      to,
      content,
    }
    socket.emit('send-private-message', messageInfo)
  }

  return (
    <ChatContext.Provider value={{ sendMessage, conversations }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used inside ChatProvider')
  return context
}