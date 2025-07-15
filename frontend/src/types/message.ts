export type Message = {
  id: string
  createdAt: string
  content: string
  conversationId: string
  sender: {
    publicId: string
    firstName: string
    lastName: string
  }
}