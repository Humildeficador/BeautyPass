import { User } from "@prisma/client"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        name: string
        avatarUrl: string | null
        publicId?: string
      }
    }
  }
}