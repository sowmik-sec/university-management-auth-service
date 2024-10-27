import ApiError from '../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload)
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Invalid semester code')
  }
  return result
}

export const AcademicSemesterService = {
  createSemester,
}
