/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react'
import { socketInstance } from '../services/socket'
import { api } from '../api'

export type Message = {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: string
}

type Conversation = {
  id: string
  participants: {
    userId: string
  }[]
}

type MessagesMap = Record<string, Message[]>

interface ChatContextType {
  conversations: MessagesMap
  getConversations: () => Promise<Conversation[]> | []
  sendMessage: (to: string, content: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<MessagesMap>({})
  const [, setConversationsId] = useState<Conversation[]>([])
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

  const getConversations = async () => {
    try {
      const { data } = await api.get<Conversation[]>('/chat/conversations')
      setConversationsId(() => [...data])
      return data
    } catch (err) {
      console.error(err)
      return []
    }
  }

  const getConversation = async ([firstUserId, secondUserId]: string[]) => {
    try {
      const { data } = await api.get(`/chat/conversations/${firstUserId}/${secondUserId}`)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ChatContext.Provider value={{
      sendMessage,
      conversations,
      getConversations
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used inside ChatProvider')
  return context
}