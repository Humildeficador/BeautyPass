import { useEffect, useState } from 'react'
import type { MessageInfo, UserSocketInfo } from '../types/userSocket'
import { getSocket } from '../services/socket'

type Message = {
  [key: string]: MessageInfo[]
}

export const useHandleUserMessages = () => {
  const [messages, setMessages] = useState<Message>({})

  const userSendMessage = (userSocketInfo: UserSocketInfo, content: string) => {
    const socket = getSocket()
    if (socket) {
      const messageInfo = {
        to: userSocketInfo.userId,
        content,
      }
      socket.emit('send-private-message', messageInfo)
    }
  }

  useEffect(() => {
    const socket = getSocket()

    if (!socket) return

    socket.on('private-message', ({ from, message, timestamp }: MessageInfo) => {
      setMessages(prev => {
        const newMessages = { ...prev }
        const userMessages = newMessages[from.sub] ? [...newMessages[from.sub]] : []

        userMessages.push({
          from,
          message,
          timestamp,
          formatedDate: formatDate(timestamp)
        })

        newMessages[from.sub] = userMessages
        return newMessages
      })
    })

    return (() => {
      socket.off('private-message')
    })
  }, [])

  return {
    messages,
    userSendMessage
  }
}

const formatDate = (timestamp: number): string => {
  const d = new Date(timestamp)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}



