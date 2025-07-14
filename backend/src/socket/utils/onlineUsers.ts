interface OnlineUserInfo {
  firstName: string,
  lastName: string,
  avatarUrl: string
}

interface OnlineUserMap {
  userInfo: OnlineUserInfo
  socketsId: Set<string>
}

interface addOnlineUserParams {
  publicId: string
  userInfo: OnlineUserInfo
  socketId: string
}

const onlineUsers = new Map<string, OnlineUserMap>()

export const addOnlineUser = ({ publicId, userInfo, socketId }: addOnlineUserParams) => {
  if (!onlineUsers.has(publicId)) {
    onlineUsers.set(
      publicId,
      {
        userInfo: userInfo,
        socketsId: new Set()
      }
    )
  }

  onlineUsers.get(publicId)!.socketsId.add(socketId)
}

export const removeOnlineUser = (publicId: string, socketId: string) => {
  const user = onlineUsers.get(publicId)
  if (!user) return

  user.socketsId.delete(socketId)
  if (user.socketsId.size === 0) {
    onlineUsers.delete(publicId)
  }
}

export const getOnlineUsers = () => {
  return Array.from(
    onlineUsers.entries().map(([publicId, { userInfo }]) => {
      return ({
        publicId,
        userInfo
      })
    })
  )
}