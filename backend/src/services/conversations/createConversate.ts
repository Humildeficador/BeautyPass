import { prisma } from '../../lib/prisma'
import { Participants } from '../../types/services/servicesTypes'

export const createConversate = async ({ userId, targetId }: Participants) => {
  return await prisma.conversation.create({
    data: {
      participants: {
        createMany: {
          data: [
            { userId: userId },
            { userId: targetId }
          ]
        }
      }
    }
  })
}