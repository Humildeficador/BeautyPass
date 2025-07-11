import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat, type ConversationMessages } from '../../../context/ChatContext'
import type { UserSocketInfo } from '../../../types/userSocket'

type Props = {
  handleCloseChat: (userId: string) => void
  userChatInfo: [string, {
    userChatInfo: UserSocketInfo
    isChatOpen: boolean
  }]
}

export const ChatItem = ({ handleCloseChat, userChatInfo }: Props) => {
  const { sendMessage, getMessageConversation } = useChat()
  const [message, setMessage] = useState<string>('')
  const [messageConversation, setMessageConversation] = useState<ConversationMessages | undefined>(undefined)

  useEffect(() => {
    const fetchConversations = async () => {
      const tempMessageConversation = await getMessageConversation(userChatInfo[0])
      setMessageConversation(tempMessageConversation)
    }
    fetchConversations()
  }, [])

  console.log(messageConversation)


  const handleValueMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(() => e.target.value)
  }

  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    sendMessage(userChatInfo[0], message)
    setMessage('')
  }

  return (
    userChatInfo[1].isChatOpen &&
    <div>
      <button onClick={() => { handleCloseChat(userChatInfo[0]) }}>
        FECHAR
      </button>
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