import { prisma } from '../../lib/prisma'

export const findConversationByUserId = async (userId: string) => {
  return await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          user: {
            id: userId
          }
        }
      }
    }
  })
}