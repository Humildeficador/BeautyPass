import { Router } from "express";
import authRouter from './routes/auth'
import homeRouter from './routes/home'

const router = Router()

router.use('/auth', authRouter)
// router.use('/', homeRouter)

export default router