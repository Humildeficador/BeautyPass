import { useState } from 'react'
import { ChatProvider } from '../../context/ChatContext'
import { OnlineUsersProvider } from '../../context/OnlineUsersContext'
import type { UserSocketInfo } from '../../types/userSocket'
import { OnlineUsersList } from '../OnlineUsersList/OnlineUsersList'
import { ChatContainer } from '../ChatContainer/ChatContainer'

export type UserChatInfo = {
  [userId: string]: {
    userChatInfo: UserSocketInfo,
    isChatOpen: boolean
  }
}

export const Users = () => {
  const [usersChatInfo, setUsersChatInfo] = useState<UserChatInfo>({})

  const handleChatUserInfo = (userSocketInfo: UserSocketInfo) => {
    setUsersChatInfo(prev => ({
      ...prev,
      [userSocketInfo.userId]: {
        userChatInfo: userSocketInfo,
        isChatOpen: true
      }
    }))
  }

  const handleCloseChat = (userId: string) => {
    setUsersChatInfo(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        isChatOpen: !prev[userId].isChatOpen
      }
    }))
  }

  return (
    <div>
      <OnlineUsersProvider>
        <OnlineUsersList handleChatUserInfo={handleChatUserInfo} />
      </OnlineUsersProvider>
      <ChatProvider>
        <ChatContainer
          handleCloseChat={handleCloseChat}
          usersChatInfo={usersChatInfo}
        />
      </ChatProvider>
    </div>
  )
}