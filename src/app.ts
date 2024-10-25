import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// global error handler
app.use(globalErrorHandler)

// application routes

app.use('/api/v1/users', UserRoutes)

// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('unhandled promise rejection'))
//   // throw new ApiError(400, 'Ore baba error hoiche')
//   // next('Ore baba error')
//   // console.log(x)
// })

export default app
