import { Router, Response } from "express"
import { OAuth2Client } from "google-auth-library"
import jwt from 'jsonwebtoken'
import { prisma } from "../lib/prisma"
import { uid } from "uid"

const router = Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

router.post('/google/callback', async (req, res) => {
  const { token } = req.body

  if (!token) {
    res.status(400).json({ error: 'Token ausente' })
    return
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email) {
      res.status(401).json({ error: 'Token invalido' })
      return
    }

    let user = await prisma.user.findUnique({
      where: {
        email: payload.email
      }
    })

    const createTempName = (email: string) => {
      return email.split('@')[0] + '_' + uid()
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: payload.name || createTempName(payload.email),
          email: payload.email,
          avatarUrl: payload.picture,
          provider: 'GOOGLE'
        }
      })
    }

    const appToken = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email
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

export default router