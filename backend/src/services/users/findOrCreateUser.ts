import { prisma } from '../../lib/prisma'
import { createTempName } from '../../utils/createTempName'

export type UserInfo = {
  email: string
  firstName: string | undefined
  lastName: string
  avatarUrl: string | undefined
  provider: ProviderType
}

export enum ProviderType {
  GOOGLE = 'GOOGLE',
  NORMAL = 'NORMAL',
  GITHUB = 'GITHUB',
  FACEBOOK = 'FACEBOOK',
}

export const findOrCreateUser = async ({
  email,
  avatarUrl,
  firstName,
  lastName,
  provider
}: UserInfo) => {
  const hasUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!hasUser) {
    return await prisma.user.create({
      data: {
        email,
        firstName: firstName || createTempName(email),
        lastName,
        avatarUrl,
        provider
      }
    })
  }

  return hasUser
}
