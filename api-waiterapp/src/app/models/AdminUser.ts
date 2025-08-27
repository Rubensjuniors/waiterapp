import { model, Schema } from 'mongoose'

export const AdminUser = model(
  'AdminUser',
  new Schema({
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  }),
)
