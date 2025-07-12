import { prisma } from '../../lib/prisma'

export const findUserByUserId = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatarUrl: true
    }
  })
}