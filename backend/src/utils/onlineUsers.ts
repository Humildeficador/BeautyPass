const onlineUsers = new Map<string, Set<string>>()

export const addUserSocket = (userId: string, socketId: string) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set())
  }
  onlineUsers.get(userId)!.add(socketId)
}

export const removeUserSocket = (userId: string, socketId: string) => {
  const userSockets = onlineUsers.get(userId)
  if (!userSockets) return

  userSockets.delete(socketId)
  if (userSockets.size === 0) {
    onlineUsers.delete(userId)
  }
}

export const getUserSockets = (userId: string): Set<string> | undefined => {
  return onlineUsers.get(userId)
}

export const getOnlineUserId = (): string[] => {
  return [...onlineUsers.keys()]
}