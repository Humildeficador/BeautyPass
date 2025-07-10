import { Router } from "express";
import authRouter from './routes/authRouter'
import indexRouter from './routes/indexRouter'
import chatRouter from './routes/chatRouter'
import { authenticates } from "./middlewares/autheticates";


const router = Router()

router.use('/', indexRouter)
router.use('/auth', authenticates,authRouter)
router.use('/chat', authenticates, chatRouter)

export default router