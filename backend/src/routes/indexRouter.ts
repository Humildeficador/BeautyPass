import { Router } from "express"
import { authenticates } from "../middlewares/autheticates"

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: "Deu certinho!" })
})

router.get('/private', authenticates, (req, res) => {
  res.status(200).json({ message: "Deu certinho!", user: req.user })
})

export default router