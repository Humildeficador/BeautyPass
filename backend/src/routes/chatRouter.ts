import { Router } from 'express'
import { findUserByPublicId } from '../services/users/findUserByPublicId'
import { createConversate } from '../services/conversations/createConversate'
import { findConversationsByUserId } from '../services/conversations/findConversationsByUserId'
import { findConversateByParticipants } from '../services/conversations/findConversateByParticipants'

const router = Router()

router.get('/conversations', async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' })
      return
    }

    const conversations = await findConversationsByUserId(req.user.id)

    if (!conversations) {
      res.status(204)
      return
    }
    
    res.status(200).json(conversations)
    return
  } catch (error) {
    console.error(error)
    return
  }
})

router.get('/conversations/:targetPublicId', async (req, res) => {
  try {
    const { targetPublicId } = req.params

    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' })
      return
    }

    if (req.user.publicId === targetPublicId) {
      res.status(501).json('Você não pode criar uma conversa consigo mesmo... AINDA')
      return
    }

    const target = await findUserByPublicId(targetPublicId)

    if (!target) {
      res.status(404).json({ error: 'Usuário não encontrado' })
      return
    }

    const conversate = await findConversateByParticipants(
      { userId: req.user.id, targetId: target.id }
    ) ?? await createConversate(
      { userId: req.user.id, targetId: target.id }
    )

    res.status(200).json(conversate)
    return
  } catch (err) {
    console.error(err)
    return
  }
})

export default router