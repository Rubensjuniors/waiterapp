import { UserRepository } from '@/app/repositories/UserRepository'

import { UserUseCase } from '.'

export function makeUserUseCase() {
  const userRepository = new UserRepository()
  const userUseCase = new UserUseCase(userRepository)

  return userUseCase
}
