/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import type { UserSocketInfo } from '../../types/userSocket'
import { ChatItem } from './ChatItem/ChatItem'
import { useChat } from '../../context/ChatContext'

export type UserChatInfo = {
  [userId: string]: {
    userChatInfo: UserSocketInfo,
    isChatOpen: boolean
  }
}

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