export type UserSocketInfo = {
  userId: string
  userInfo: {
    firstName: string
    lastName: string
    avatarUrl: string
    conversationsId: { conversationId: string }[]
  }
  sockets: string[]
}

export type MessageInfo = {
  from: {
    firstName: string
    lastName: string
    sub: string
  }
  content: string
}