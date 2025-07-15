import { useState } from 'react'
import { ChatProvider } from '../../context/ChatContext'
import { ChatContainer } from '../ChatContainer/ChatContainer'
import { OnlineUsersList } from '../OnlineUsersList/OnlineUsersList'
import type { OnlineUserInfo, UserChatInfo } from '../../types/user'
import { OnlineUsersProvider } from '../../context/OnlineUsersContext'

export const Users = () => {
  const [onlineUserInfo, setOnlineUserInfo] = useState<UserChatInfo>({})

  const handleChatUserInfo = (onlineUserInfo: OnlineUserInfo) => {
    setOnlineUserInfo(prev => ({
      ...prev,
      [onlineUserInfo.publicId]: {
        userInfo: {
          avatarUrl: onlineUserInfo.userInfo.avatarUrl,
          firstName: onlineUserInfo.userInfo.firstName,
          lastName: onlineUserInfo.userInfo.lastName
        },
        isChatOpen: true
      }
    }))
  }

  const handleCloseChat = (publicId: string) => {
    setOnlineUserInfo(prev => ({
      ...prev,
      [publicId]: {
        ...prev[publicId],
        isChatOpen: !prev[publicId].isChatOpen
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
          usersChatInfo={onlineUserInfo}
        />
      </ChatProvider>
    </div>
  )
}