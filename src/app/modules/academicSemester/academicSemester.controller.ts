/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AcademicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../../shsred/catchAsync'
import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../shsred/sendResponse'
import pick from '../../../shsred/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterableFields } from './academicSemester.constant'
// import { z } from 'zod'
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData)

    sendResponse(res, {
      success: true,
      message: 'Semester Created Successfully',
      statusCode: 200,
      data: result,
    })
    next()
  },
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    )

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      message: 'Semester retrieved successfully',
      statusCode: 200,
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await AcademicSemesterService.getSingleSemester(id)
    sendResponse<IAcademicSemester>(res, {
      success: true,
      message: 'Semester retrieved successfully',
      statusCode: 200,
      data: result,
    })
    next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
}
