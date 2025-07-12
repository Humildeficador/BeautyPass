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
          },
          conversation: {
            select: {
              messages: {
                take: 1,
                select: {
                  sender: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}