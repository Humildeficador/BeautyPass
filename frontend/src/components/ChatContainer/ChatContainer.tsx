import type { UserSocketInfo } from '../../types/userSocket'
import { ChatItem } from './ChatItem/ChatItem'

export type UserChatInfo = {
  [userId: string]: {
    userChatInfo: UserSocketInfo,
    isChatOpen: boolean
  }
}

type Props = {
  handleCloseChat: (userId: string) => void
  usersChatInfo: UserChatInfo
}

export const ChatContainer = ({ handleCloseChat, usersChatInfo }: Props) => {

  return (
    <div>
      {Object.entries(usersChatInfo).map(userChatInfo => (
        <ChatItem
          key={userChatInfo[0]}
          handleCloseChat={handleCloseChat}
          userChatInfo={userChatInfo}
        />
      ))}
    </div>
  )
}