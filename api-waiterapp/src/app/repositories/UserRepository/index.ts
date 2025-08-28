import { User } from '@/app/models/User'

import { ICreateUser, IUpdateUser, IUserRepository } from './types'

export class UserRepository implements IUserRepository {
  async create(data: ICreateUser) {
    const { _id, name, email, urlCoverPhoto, createdAt, role } = await User.create(data)

    return {
      id: _id.toString(),
      name,
      email,
      urlCoverPhoto,
      createdAt,
      role,
    }
  }

  async update({ id, data }: IUpdateUser) {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: data }, { new: true })

    if (!updatedUser) {
      return null
    }

    const { name, email, urlCoverPhoto, createdAt, role } = updatedUser

    return {
      id: updatedUser?.id,
      name,
      email,
      urlCoverPhoto,
      createdAt,
      role,
    }
  }

  async findByEmail(email: string) {
    return await User.findOne({ email })
  }

  async delete(id: string) {
    await User.findByIdAndDelete(id)
    return null
  }
}
