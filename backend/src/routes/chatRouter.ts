import { Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/conversations', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' })
      return
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: req.user.id
          }
        }
      },
      include: {
        participants: {
          select: {
            userId: true
          }
        }
      }
    })

    if (conversations) {
      res.status(200).json(conversations)
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/conversations/:to', async (req, res) => {
  const { to } = req.params

  if (!req.user) {
    res.status(401).json({ error: 'Usuário não autenticado' })
    return
  }

  try {
    const conversate = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: {
            userId: { in: [req.user.id, to] }
          }
        }
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })
      ?? await prisma.conversation.create({
        data: {
          participants: {
            createMany: {
              data: [
                { userId: req.user.id },
                { userId: to }
              ]
            }
          }
        }
      })
    console.log('requisição')

    res.status(200).json(conversate)
  } catch (err) {
    console.error(err)
  }
})

export default router