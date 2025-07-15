import { useEffect, useRef } from 'react'
import styles from './MessageContainer.module.scss'
import { MessageFrom, MessageTo } from './MessageItem/MessageItem'
import type { ConversationMessages } from '../../context/ChatContext'

type Props = {
  messageConversation: ConversationMessages
  chatWith: string
}

export const MessageContainer = ({ messageConversation: { messages }, chatWith }: Props) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [messages])

  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        {messages.map(({ content, id, createdAt, sender }) => (
          sender.publicId !== chatWith ?
            <MessageFrom
              key={id}
              content={content}
              createdAt={createdAt}
              sender={sender}
            />
            :
            <MessageTo
              key={id}
              content={content}
              createdAt={createdAt}
              sender={sender}
            />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  )
}