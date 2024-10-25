import { Model } from 'mongoose'

// THIS CODE SHOULD BE IN BRANCH SCRUM-5
export type IUser = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
