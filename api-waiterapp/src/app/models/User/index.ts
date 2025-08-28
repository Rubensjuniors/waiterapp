import { model, Schema } from 'mongoose'

import { IUser, UserRole } from './types'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  urlCoverPhoto: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.COMMON,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const User = model<IUser>('User', userSchema)
