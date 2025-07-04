import React, { useState } from 'react'
import type { UserSocketInfo } from '../../../types/userSocket'
import { UserPrivateChat } from '../../UserPrivateChat'
import { UserContainer, Username, UserProfilePicture } from './index.style'

type Props = {
  user: UserSocketInfo
}

export const OnlineUserItem = React.memo(({ user }: Props) => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const isOnlineUser = (): boolean => {
    return !!user.sockets.length
  }

  const handleUserAction = () => {
    setIsChatOpen(prev => !prev)
  }

  return (
    <>
      <UserContainer onClick={handleUserAction}>
        <UserProfilePicture
          src={user.userInfo.avatarUrl}
          alt={`${user.userInfo.firstName} Avatar`}
          $isOnlineUser={isOnlineUser()}
        />
        <Username>
          {`${user.userInfo.firstName} ${user.userInfo.lastName}`}
        </Username>
      </UserContainer>
      {isChatOpen &&
        <UserPrivateChat userSocketInfo={user} />
      }
    </>
  )
})