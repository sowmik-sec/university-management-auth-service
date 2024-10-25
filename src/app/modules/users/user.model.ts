// THIS CODE SHOULD BE IN BRANCH SCRUM-5
import { model, Schema } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const User = model<IUser, UserModel>('User', userSchema)
