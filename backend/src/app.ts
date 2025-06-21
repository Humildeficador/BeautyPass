import express from "express";
import router from "./router";
import cors from 'cors'

export const app = express()

app.use(express.json())
app.use(router)
app.use(cors({
  origin: 'http://localhost:5173',
}))

app.post('/', (req, res) => {
  res.status(200).send('Deu certinho sem a merda do router')
})