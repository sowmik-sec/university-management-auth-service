/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import { catchAsync } from '../../../shsred/catchAsync'
import sendResponse from '../../../shsred/sendResponse'
// import { z } from 'zod'
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    // res.status(200).json({
    //   success: true,
    //   message: 'User created successfully!',
    //   data: result,
    // })
    sendResponse(res, {
      success: true,
      message: 'User Created Successfully',
      statusCode: 200,
      data: result,
    })
  },
)

export const UserController = { createUser }
