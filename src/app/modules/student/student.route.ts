import express from 'express'
const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)
router.get('/', StudentController.getAllStudents)
router.delete('/:id', StudentController.deleteStudent)

// router.patch(
//   '/create-student',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createStudent,
// )

export const StudentRoutes = router
