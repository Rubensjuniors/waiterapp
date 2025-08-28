import { hash as bcryptjsHash } from 'bcryptjs'

import { EmailAlreadyRegisteredError } from '@/app/errors/EmailAlreadyRegisteredError'
import { IUserRepository } from '@/app/repositories/UserRepository/types'

import { RegisterUseCaseRequest, RegisterUseCaseResponse, UpdateUserUseCase } from './types'

export class UserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async registerUser({
    email,
    name,
    password,
    role,
    urlCoverPhoto,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const checkEmail = await this.usersRepository.findByEmail(email)

    if (checkEmail) {
      throw new EmailAlreadyRegisteredError()
    }

    const passwordHash = await bcryptjsHash(password, 8)

    const user = await this.usersRepository.create({
      email,
      name,
      passwordHash,
      role,
      urlCoverPhoto,
    })

    return {
      user,
    }
  }

  async updateUser({ id, data }: UpdateUserUseCase) {
    await this.usersRepository.update({ id, data })
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id)
  }
}
