import React from 'react'
import { preload } from 'react-dom'
import type { OnlineUserInfo } from '../../../types/user'
import { UserContainer, Username, UserProfilePicture } from './OnlineUserItem.style'

type Props = {
  onlineUser: OnlineUserInfo
  handleChatUserInfo: (OnlineUserInfo: OnlineUserInfo) => void
}

export const OnlineUserItem = React.memo(({
  onlineUser,
  handleChatUserInfo
}: Props) => {
  preload(onlineUser.userInfo.avatarUrl, { as: 'image' })
  return (
    <UserContainer onClick={() => {
      handleChatUserInfo(onlineUser)
    }}>
      <UserProfilePicture
        src={onlineUser.userInfo.avatarUrl}
        alt={`${onlineUser.userInfo.firstName} Avatar`}
        $isOnlineUser={true}
      />
      <Username>
        {`${onlineUser.userInfo.firstName} ${onlineUser.userInfo.lastName}`}
      </Username>
    </UserContainer>
  )
})