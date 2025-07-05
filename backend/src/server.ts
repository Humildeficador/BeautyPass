import { app } from './app'
import { createServer } from 'node:http'
import { setupSocket } from './socket'

export const server = createServer(app)

setupSocket()