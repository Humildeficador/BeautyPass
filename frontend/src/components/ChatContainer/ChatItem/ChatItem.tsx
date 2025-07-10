import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useChat } from '../../../context/ChatContext'
import type { UserSocketInfo } from '../../../types/userSocket'

type Props = {
  handleCloseChat: (userId: string) => void
  userChatInfo: [string, {
    userChatInfo: UserSocketInfo
    isChatOpen: boolean
  }]
}

export const ChatItem = ({ handleCloseChat, userChatInfo }: Props) => {
  const { sendMessage } = useChat()
  const [message, setMessage] = useState<string>('')

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