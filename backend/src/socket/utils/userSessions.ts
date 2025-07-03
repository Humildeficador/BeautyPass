export type UserInfo = {
  firstName: string
  lastName: string
  avatarUrl: string
}

export type UserSession = {
  userInfo: UserInfo
  sockets: Set<string>
}

export type OnlineUserListItem = {
  userId: string
  userInfo: UserInfo
  sockets: string[]
}

/* Mapa de controle de sessão */
const userSessions = new Map<string, UserSession>()

/* Adiciona uma conexão/socket para o usuario */
export const addUserSocket = (
  userId: string,
  userInfo: {
    firstName: string,
    lastName: string,
    avatarUrl: string
  },
  socketId: string
) => {
  if (!userSessions.has(userId)) {
    userSessions.set(
      userId,
      {
        userInfo,
        sockets: new Set()
      }
    )
  }
  userSessions.get(userId)!.sockets.add(socketId)
}

/* Remove um socket ou usuario caso não tenha mais nenhuma conexão ativa */
export const removeUserSocket = (userId: string, socketId: string) => {
  const userSockets = userSessions.get(userId)
  if (!userSockets) return

  userSockets.sockets.delete(socketId)
  if (userSockets.sockets.size === 0) {
    userSessions.delete(userId)
  }
}

/* Lista todos os sockets daquele usuario */
export const getUserSockets = (userId: string): Set<string> | undefined => {
  return userSessions.get(userId)?.sockets
}

/* Lista todos os usuarios conectados */
export const getOnlineUsers = (): OnlineUserListItem[] => {
  return Array.from(userSessions.entries()).map(
    ([userId, { userInfo, sockets }]) => ({
      userId,
      userInfo,
      sockets: Array.from(sockets)
    }))
}

/* Retorna se um usuario está online */
export const isUserOnline = (userId: string): boolean => {
  return userSessions.has(userId)
}