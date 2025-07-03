export type UserSocketInfo = {
  userId: string
  userInfo: {
    firstName: string
    lastName: string
    avatarUrl: string
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