/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { ChatItem } from './ChatItem/ChatItem'
import { useChat } from '../../context/ChatContext'
import type { UserChatInfo } from '../../types/user'

type Props = {
  handleCloseChat: (userId: string) => void
  usersChatInfo: UserChatInfo
}

export const ChatContainer = ({ handleCloseChat, usersChatInfo }: Props) => {
  const { getConversations } = useChat()

  useEffect(() => {
    (async () => {
      console.log(await getConversations())
    })()
  }, [])

  return (
    <div>
      {Object.entries(usersChatInfo).map(userChatInfo => {
        return (
          <ChatItem
            key={userChatInfo[0]}
            handleCloseChat={handleCloseChat}
            userChatInfo={userChatInfo}
          />
        )
      })}
    </div>
  )
}