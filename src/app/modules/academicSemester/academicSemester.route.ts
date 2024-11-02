import express from 'express'
import { AcademicSemesterValidation } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterSchema),
  AcademicSemesterController.createSemester,
)

router.patch('/:id', AcademicSemesterController.updateSemester)

router.get('/:id', AcademicSemesterController.getSingleSemester)

router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
