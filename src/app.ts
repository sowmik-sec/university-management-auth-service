import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
// import { UserRoutes } from './app/modules/user/user.route'
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes

app.use('/api/v1', routes)

// global error handler
app.use(globalErrorHandler)

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  })
  next()
})

// app.use('/api/v1/user', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)

// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('unhandled promise rejection'))
//   // throw new ApiError(400, 'Ore baba error hoiche')
//   // next('Ore baba error')
//   // console.log(x)
// })

export default app
