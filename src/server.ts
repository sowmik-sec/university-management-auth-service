import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shsred/logger'
import { Server } from 'http'

let server: Server

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Successfully connected to db`)
    server = app.listen(config.port, () => {
      logger.info(
        `University management app is listening on port ${config.port}`,
      )
    })
  } catch (err) {
    errorLogger.error(`Failed to connect to db`, err)
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
      setTimeout(() => {
        errorLogger.error('Forcing shutdown due to unresponsive connections')
        process.exit(1)
      }, 5000)
    } else {
      process.exit(1)
    }
  })
}

main().catch(err => logger.error(err))

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
