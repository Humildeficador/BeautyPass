export type OnlineUserInfo = {
  publicId: string
  userInfo: {
    firstName: string
    lastName: string
    avatarUrl: string
  }
}

export type UserChatInfo = {
  [publicId: string]: {
    userInfo: {
      firstName: string
      lastName: string
      avatarUrl: string
    }
    isChatOpen: boolean
  }
}