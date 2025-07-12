import { prisma } from '../../lib/prisma'

export const findUserByPublicId = async (publicId: string) => {
  return await prisma.user.findFirst({
    where: {
      publicId
    },
    select: {
      id: true
    }
  })
}