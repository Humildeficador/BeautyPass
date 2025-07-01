type OnlineUserListItem = {
  userId: string
  userInfo: {
    firstName: string
    lastName: string
  }
  sockets: string[]
}

const onlineUsers = new Map<
  string,
  {
    userInfo: {
      firstName: string,
      lastName: string
    }
    sockets: Set<string>
  }>()

export const addUserSocket = (
  userId: string,
  userInfo: { firstName: string, lastName: string },
  socketId: string
) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(
      userId,
      {
        userInfo,
        sockets: new Set()
      }
    )
  }
  onlineUsers.get(userId)!.sockets.add(socketId)
}

export const removeUserSocket = (userId: string, socketId: string) => {
  const userSockets = onlineUsers.get(userId)
  if (!userSockets) return

  userSockets.sockets.delete(socketId)
  if (userSockets.sockets.size === 0) {
    onlineUsers.delete(userId)
  }
}

export const getUserSockets = (userId: string): Set<string> | undefined => {
  return onlineUsers.get(userId)?.sockets
}

export const getOnlineUserList = (): OnlineUserListItem[] => {
  return Array.from(onlineUsers.entries()).map(
    ([userId, { userInfo, sockets }]) => ({
      userId,
      userInfo,
      sockets: Array.from(sockets)
    }))
}