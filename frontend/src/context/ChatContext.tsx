/* eslint-disable react-hooks/exhaustive-deps */
import { api } from '../api'
import type { Message } from '../types/message'
import { socketInstance } from '../services/socket'
import { createContext, useContext, useEffect, useState } from 'react'

type Conversation = {
  id: string
  participants: {
    userId: string
  }[]
}

export type ConversationMessages = {
  id: string
  messages: Message[]
}

type MessagesMap = Record<string, Message[]>

interface ChatContextType {
  conversations: MessagesMap
  messageConversation: ConversationMessages | null
  sendMessage: (to: string, content: string) => void
  getConversations: () => Promise<Conversation[]> | []
  getMessageConversation: (to: string) => Promise<ConversationMessages | undefined>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = socketInstance()
  const [, setConversationsId] = useState<Conversation[]>([])
  const [conversations, setConversations] = useState<MessagesMap>({})
  const [messageConversation, setMessageConversation] = useState<ConversationMessages | null>(null)

  useEffect(() => {
    socket.on('new-private-message', handleMessage)

    socket.on('message-notification', (
      { conversationId, message }: { conversationId: string, message: Message }
    ) => {
      console.log(`Nova notificação\n${message.content}`)
      socket.emit('join-conversation', conversationId)
    })

    return () => {
      socket.off('new-private-message', handleMessage)
    }
  }, [])

  const handleMessage = (message: Message) => {
    setConversations(prev => ({
      ...prev,
      [message.conversationId]: [
        ...(prev[message.conversationId] || []),
        message
      ]
    }))
  }

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

  const getMessageConversation = async (publicId: string) => {
    try {
      const { data } = await api.get<ConversationMessages>(`/chat/conversations/${publicId}`)
      setMessageConversation(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ChatContext.Provider value={{
      sendMessage,
      conversations,
      getConversations,
      getMessageConversation,
      messageConversation
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