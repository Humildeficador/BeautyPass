import { Router } from "express";
import { OAuth2Client } from "google-auth-library";

const router = Router()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

router.post('/callback', async (req, res) => {
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

    res.status(200).json({ user: payload })
    return
  } catch (error) {
    console.error('Erro ao verificar token', error)
    res.status(500).json({ error: 'Erro interno ao autenticar' })

  }
})

export default router