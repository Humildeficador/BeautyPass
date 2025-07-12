import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { findUserByUserId } from '../services/users/findUserByUserId'

interface JwtUserPayload extends JwtPayload {
  sub: string
}

/* Middleware para rotas autenticadas usando JWT */

/**
 * @description Pega o JWT que vêm pelo header da req, splita pra tirar o Barear da string, da erro se não tiver o token, tenta fazer o decode com o jsonwebtoken e procura o userId no banco de dados, se der tudo certo guarda em req.user
 */

export async function authenticates(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' })
      return
    }

    const JWT_SECRET = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload

    const user = await findUserByUserId(decoded.sub)

    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' })
      return
    }

    req.user = {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatarUrl: user.avatarUrl
    }

    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
    return
  }
}