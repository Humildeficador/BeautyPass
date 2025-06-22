import { Router } from "express";
import authRouter from './routes/authRouter'
import indexRouter from './routes/indexRouter'

const router = Router()

router.use('/', indexRouter)
router.use('/auth', authRouter)

export default router