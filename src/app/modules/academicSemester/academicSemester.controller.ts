/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AcademicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shsred/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shsred/sendResponse'
// import { z } from 'zod'
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData)
    next()
    sendResponse(res, {
      success: true,
      message: 'Semester Created Successfully',
      statusCode: 200,
      data: result,
    })
  },
)
export const AcademicSemesterController = { createSemester }
