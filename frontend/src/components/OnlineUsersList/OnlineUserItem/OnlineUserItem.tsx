import React from 'react'
import type { UserSocketInfo } from '../../../types/userSocket'
import { UserContainer, Username, UserProfilePicture } from './OnlineUserItem.style'


type Props = {
  user: UserSocketInfo
  handleChatUserInfo: (userSocketInfo: UserSocketInfo) => void
}

export const OnlineUserItem = React.memo(({
  user,
  handleChatUserInfo
}: Props) => {
  return (
    <>
      <UserContainer onClick={() => {
        handleChatUserInfo(user)
      }}>
        <UserProfilePicture
          src={user.userInfo.avatarUrl}
          alt={`${user.userInfo.firstName} Avatar`}
          $isOnlineUser={true}
        />
        <Username>
          {`${user.userInfo.firstName} ${user.userInfo.lastName}`}
        </Username>
      </UserContainer>

    </>
  )
})