import React from 'react'
import styles from './MessageItem.module.scss'
import { formatDate } from '../../../utils/formatDate'

type Props = {
  content: string
  createdAt: string
  sender: {
    publicId: string
    firstName: string
    lastName: string
  }
}

export const MessageFrom = React.memo(({ content, createdAt }: Props) => {
  const date = formatDate(createdAt)
  return (
    <div className={`${styles.container} ${styles.from}`}>
      <span className={styles.message}>{content}</span>
      <span className={styles.timestamp}>
        <div className={styles.time}>
          {date}
        </div>
      </span>
    </div>
  )
})

export const MessageTo = React.memo(({ content, createdAt }: Props) => {
  const date = formatDate(createdAt)
  return (
    <div className={`${styles.container} ${styles.to}`}>
      <span className={styles.message}>{content}</span>
      <span className={styles.timestamp}>
        <div className={styles.time}>
          {date}
        </div>
      </span>
    </div>
  )
})