import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'chaveSuperSecreta'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const { id } = decoded as { id: string }

    req.user = { id }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
    return
  }
}