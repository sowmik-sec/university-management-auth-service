import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

import path from 'path'
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'wrong meow!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'phu-%DATE%-error.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }
