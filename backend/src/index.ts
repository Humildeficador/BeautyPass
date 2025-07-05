import { server } from './server'
import dotenv from 'dotenv'
import { TUNNEL, IP_LIST } from './utils/tunnel'

dotenv.config()

const PORT = process.env.PORT || 3333


if (TUNNEL) {
  server.listen({ host: '0.0.0.0', port: PORT }, () => {
    console.log(`Server running on\n${IP_LIST}\nO back-end só aceita requisições no http://localhost:${PORT}`)
  })
} else {
  server.listen({ host: '0.0.0.0', port: PORT }, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
