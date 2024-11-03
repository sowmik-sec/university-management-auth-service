/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { catchAsync } from '../../../shsred/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shsred/sendResponse'
import pick from '../../../shsred/pick'
import { paginationFields } from '../../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await StudentService.getAllStudents(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    success: true,
    message: 'Student retrieved successfully',
    statusCode: 200,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.getSingleStudent(id)
  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await StudentService.updateStudent(id, updatedData)
  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.deleteStudent(id)
  sendResponse<IStudent>(res, {
    success: true,
    message: 'Student deleted successfully',
    statusCode: 200,
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
