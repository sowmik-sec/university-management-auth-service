/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ErrorRequestHandler, Response, Request } from 'express'
import config from '../../config'
import IGenericErrorMessage from '../interfaces/error'
import handleValidationError from '../errors/handleValidationError'
import ApiError from '../errors/ApiError'
import { errorLogger } from '../../shsred/logger'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)
  let statusCode: number = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
