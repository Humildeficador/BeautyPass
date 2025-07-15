/* eslint-disable react-hooks/exhaustive-deps */
import { MessageContainer } from '../../MessageContainer/MessageContainer'
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat, type ConversationMessages } from '../../../context/ChatContext'

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
  }, [])

  const handleValueMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(() => e.target.value)
  }

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || message.trim() === '') return
    sendMessage(userChatInfo[0], message)
    // if (messageConversation) sendMessage(messageConversation.id, message)
    setMessage('')
  }

  return (
    userChatInfo[1].isChatOpen &&
    <div>
      <button onClick={() => { handleCloseChat(userChatInfo[0]) }}>
        FECHAR
      </button>
      {
        isLoading ?
          <div>Messages is loading...</div> :
          messageConversation &&
          <MessageContainer
            chatWith={userChatInfo[0]}
            messageConversation={messageConversation}
          />
      }
      <div>
        <input
          type='text'
          value={message}
          onChange={handleValueMessage}
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  )
}