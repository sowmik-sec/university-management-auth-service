/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
// import { z } from 'zod'
const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result =
      await AcademicSemesterService.createSemester(academicSemesterData)
    res.status(200).json({
      success: true,
      message: 'Academic Semester is created successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const AcademicSemesterController = { createSemester }
