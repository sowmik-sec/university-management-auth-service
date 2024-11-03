import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config'
import ApiError from '../../errors/ApiError'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null | undefined> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  const session = await mongoose.startSession()
  let newUserAllData = null
  try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id
    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(400, 'Failed to create user')
    }

    // set student --> _id into user.student
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(400, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
    return newUserAllData
  }
}

export const UserService = {
  createStudent,
}
