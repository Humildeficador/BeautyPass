import { prisma } from '../../lib/prisma'

type Message = {
  conversationId: string
  content: string,
  from: string
}

export const createMessage = async ({ conversationId, content, from }: Message) => {
  return await prisma.message.create({
    data: {
      conversationId: conversationId,
      content: content,
      senderId: from
    },
    select: {
      sender: {
        select: {
          publicId: true,
          firstName: true,
          lastName: true
        }
      },
      content: true,
      conversationId: true,
      id: true,
      createdAt: true
    }
  })
}