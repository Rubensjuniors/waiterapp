import { compare as bcryptjsCompare, hash as bcryptjsHash } from 'bcryptjs'

import { EmailAlreadyRegisteredError } from '@/app/errors/EmailAlreadyRegisteredError'
import { InvalidCredentialsError } from '@/app/errors/InvalidCredentialsError'
import { IUserRepository } from '@/app/repositories/UserRepository/types'

import {
  AuthenticateRequest,
  AuthenticateResponse,
  RegisterUseCaseRequest,
  RegisterUseCaseResponse,
  UpdateUserUseCase,
} from './types'

export class UserUseCase {
  constructor(private readonly usersRepository: IUserRepository) {}

  async authenticate({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await bcryptjsCompare(password, user.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }

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
