import { Router } from "express"
import { authenticate } from "../middleware/autheticate"

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: "Deu certinho!" })
})

router.get('/private', authenticate, (req, res) => {
  res.status(200).json({ message: "Deu certinho!", user: req.user })
})

export default router