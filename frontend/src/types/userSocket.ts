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
  message: string
  from: {
    firstName: string
    lastName: string
    sub: string
  }
  timestamp: number
  formatedDate?: string
}