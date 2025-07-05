import express from 'express'
import router from './router'
import cors from 'cors'
import { TUNNEL } from './utils/tunnel'

export const app = express()

if (TUNNEL) {
  console.log('Você está usando TUNNEL, não esqueça de abrir a porta no FIREWALL')
  app.use(cors({
    origin: 'https://beautyjoao.loca.lt'
  }))
} else {
  app.use(cors())
}


app.use(express.json())
app.use(router)