// THIS CODE SHOULD BE IN BRANCH SCRUM-5
import { model, Model, Schema } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = Model<IUser, object>

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
