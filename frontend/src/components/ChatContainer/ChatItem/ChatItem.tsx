/* eslint-disable react-hooks/exhaustive-deps */
import styles from './ChatItem.module.scss'
import type { Message } from '../../../types/message'
import { socketInstance } from '../../../services/socket'
import { MessageContainer } from '../../MessageContainer/MessageContainer'
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat, type ConversationMessages } from '../../../context/ChatContext'
import { SendHorizontal, X } from 'lucide-react'

type Props = {
  handleCloseChat: (userId: string) => void
  userChatInfo: [string, {
    userInfo: {
      firstName: string
      lastName: string
      avatarUrl: string
    }
    isChatOpen: boolean
  }]
}

export const ChatItem = ({ handleCloseChat, userChatInfo }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const { sendMessage, getMessageConversation } = useChat()
  const [message, setMessage] = useState<string>('')
  const [messageConversation, setMessageConversation] = useState<ConversationMessages | undefined>(undefined)

  const socket = socketInstance()

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getMessageConversation(userChatInfo[0])
        if (data) setMessageConversation(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchConversations()

    socket.on('message-submitted', handlerMessageConversation)
    socket.on('new-private-message', handlerMessageConversation)

    return () => {
      socket.off('message-submitted', handlerMessageConversation)
      socket.off('new-private-message', handlerMessageConversation)
    }
  }, [])

  const handlerMessageConversation = (message: Message) => {
    setMessageConversation((prev) => (prev && {
      ...prev,
      messages: [...prev.messages, message]
    }))
  }

  const handleValueMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(() => e.target.value)
  }

  const handleSendMessage = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || message.trim() === '' || (e.key === 'Enter' && e.shiftKey)) return
    console.log(e)
    sendMessage(userChatInfo[0], message)
    // if (messageConversation) sendMessage(messageConversation.id, message)
    setMessage('')
  }

  return (
    userChatInfo[1].isChatOpen &&
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.userCard}>
          <img
            src={userChatInfo[1].userInfo.avatarUrl}
            alt={userChatInfo[1].userInfo.firstName}
            className={styles.userAvatar}
          />
          <span>
            {userChatInfo[1].userInfo.firstName}
            &nbsp;
            {userChatInfo[1].userInfo.lastName}
          </span>
        </div>
        <div className={styles.closeButton}>
          <X
            color='#a1a1a1'

            onClick={() => { handleCloseChat(userChatInfo[0]) }}
          />
        </div>
      </header>
      {
        isLoading ?
          <div>Messages is loading...</div> :
          messageConversation &&
          <MessageContainer
            chatWith={userChatInfo[0]}
            messageConversation={messageConversation}
          />
      }
      <div className={styles.textBox}>
        <textarea
          className={styles.text}
          value={message}
          onChange={handleValueMessage}
          onKeyDown={handleSendMessage}
          maxLength={2500}
        />
        <div className={styles.sendButton}>
          <SendHorizontal />
        </div>
      </div>
    </div>
  )
}