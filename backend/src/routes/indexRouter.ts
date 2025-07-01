import { Router } from "express"
import { authenticates } from "../middlewares/autheticates"
import { getOnlineUserList } from "../utils/onlineUsers"

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: "Deu certinho!" })
})

router.get('/private', authenticates, (req, res) => {
  res.status(200).json({ message: "Deu certinho!", user: req.user })
})

router.get('/online-users', authenticates, (req, res) => {
  res.status(200).json({ online: getOnlineUserList() })
})

export default router