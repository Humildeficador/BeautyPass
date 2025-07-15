import { prisma } from '../../lib/prisma'

export const findConversationsByUserId = async (userId: string) => {
  return await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: userId
        }
      }
    },
    include: {
      participants: {
        select: {
          user: {
            select: {
              publicId: true
            },
          }
        }
      },
      messages: {
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          sender: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        },
        take: 1 
      }
    }
  })
}