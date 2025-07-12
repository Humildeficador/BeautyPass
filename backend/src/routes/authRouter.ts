import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { OAuth2Client } from 'google-auth-library'
import { authenticates } from '../middlewares/autheticates'
import { findOrCreateUser, ProviderType, UserInfo } from '../services/users/findOrCreateUser'

const router = Router()

router.post('/google/callback', async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      res.status(400).json({ error: 'Token ausente' })
      return
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const JWT_SECRET = process.env.JWT_SECRET!
    const payload = ticket.getPayload()

    if (!payload || !payload.email) {
      res.status(401).json({ error: 'Token invalido' })
      return
    }

    const teste: UserInfo = {
      avatarUrl: payload.picture,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name || '',
      provider: ProviderType.GOOGLE
    }

    const user = await findOrCreateUser(teste)

    const appToken = jwt.sign(
      {
        sub: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        publicId: user.publicId
      },
      JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.status(200).json({ token: appToken, user })
    return
  } catch (error) {
    console.error('Erro ao verificar token', error)
    res.status(500).json({ error: 'Erro interno ao autenticar' })
    return
  }
})

router.get('/me', authenticates, async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' })
      return
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarUrl: true,
        provider: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
      return
    }

    res.status(200).json({ user })
    return
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do usuário' })
  }
})

export default router