import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

interface JwtUserPayload extends JwtPayload {
  sub: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

export async function authenticates(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub
      }
    })

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' })
      return
    }

    req.user = { id: user.id, name: `${user.firstName} ${user.lastName}` }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
    return
  }
}