import mongoose from 'mongoose'
import IGenericErrorMessage from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      if (el instanceof mongoose.Error.ValidatorError) {
        return {
          path: el.path,
          message: el.message,
        }
      } else if (el instanceof mongoose.Error.CastError) {
        return {
          path: el.path,
          message: el.message,
        }
      } else {
        return {
          path: 'unknown',
          message: 'Unknown error',
        }
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
