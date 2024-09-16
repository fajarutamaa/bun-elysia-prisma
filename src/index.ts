import Elysia from 'elysia'
import { cors } from '@elysiajs/cors'
import { prisma } from './infrastructure/config/prisma.config'
import dotenv from 'dotenv'
import pino from 'pino'

dotenv.config()

const port = Number(process.env.PORT)

const logger = pino()
const app = new Elysia()

app.use(cors())

app.get('/', () => {
    logger.info('received a request')
    return {
        status: true,
        message: 'OK',
    }
})

app.listen(port, () => {
    logger.info(`server running on port ${port}`)
})

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    logger.info('disconnected from database')
    process.exit(0)
})
