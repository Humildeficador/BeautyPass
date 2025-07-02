import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import type { UserSocketInfo } from '../../types/userSocket'
import { ChatContainer } from './index.style'
import { useHandleUserMessages } from '../../hooks/useHandleUserMessages'
import { useChat } from '../../context/ChatContext'

type Props = {
  userSocketInfo: UserSocketInfo
}

export const UserPrivateChat = ({ userSocketInfo }: Props) => {
  const { messages } = useChat()
  const [message, setMessage] = useState('')
  const { userSendMessage } = useHandleUserMessages()

  const handleUserMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(() => e.target.value)
  }

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    userSendMessage(userSocketInfo, message)
    setMessage('')
  }
  return (
    <ChatContainer>
      <input
        type="text"
        onChange={handleUserMessage}
        value={message}
        onKeyDown={handleSendMessage}
      />
    </ChatContainer>
  )
}