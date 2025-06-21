import { Router } from "express";

const router = Router()

router.post('/', (req, res) => {
  res.status(200).json({message: "Deu certinho!"})
})

export default router