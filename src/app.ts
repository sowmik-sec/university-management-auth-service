import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
// import { UserRoutes } from './app/modules/user/user.route'
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// global error handler
app.use(globalErrorHandler)

// application routes

app.use('/api/v1', routes)

// app.use('/api/v1/user', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)

// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('unhandled promise rejection'))
//   // throw new ApiError(400, 'Ore baba error hoiche')
//   // next('Ore baba error')
//   // console.log(x)
// })

export default app
