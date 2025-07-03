import { useChat } from '../../context/ChatContext'

export const Chat = () => {
  const { conversations } = useChat()
  console.log(conversations)
  return (
    <div>

    </div>
  )
}