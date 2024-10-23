import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shsred/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Successfully connected to db`)
    app.listen(config.port, () => {
      logger.info(
        `University management app is listening on port ${config.port}`,
      )
    })
  } catch (err) {
    errorLogger.error(`Failed to connect to db`, err)
  }
}

main().catch(err => logger.error(err))
