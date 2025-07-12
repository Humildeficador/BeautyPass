import { prisma } from '../../lib/prisma'
import { Participants } from '../../types/services/servicesTypes'

export const findConversateByParticipants = async (
  { userId, targetId }: Participants
) => {
  await prisma.conversation.findFirst({
    where: {
      participants: {
        every: {
          userId: { in: [userId, targetId] }
        }
      }
    },
    include: {
      messages: {
        select: {
          content: true,
          conversationId: true,
          id: true,
          createdAt: true,
          sender: {
            select: {
              publicId: true,
              firstName: true,
              lastName: true
            }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  })
}