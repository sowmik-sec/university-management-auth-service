import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../interfaces/common'
import IPaginationOptions from '../../interfaces/pagination'
import { IStudent, IStudentFilters } from './student.interface'
import { studentSearchableFields } from './student.constant'
import { Student } from './student.model'
import ApiError from '../../errors/ApiError'

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort()
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(404, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = payload

  const updatedStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      updatedStudentData[nameKey as keyof Partial<IStudent>] =
        name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      updatedStudentData[guardianKey as keyof Partial<IStudent>] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`
      updatedStudentData[localGuardianKey as keyof Partial<IStudent>] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
