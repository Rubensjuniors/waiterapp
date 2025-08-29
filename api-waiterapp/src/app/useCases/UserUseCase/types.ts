import { IUser } from '@/app/models/User/types'

export type RegisterUseCaseRequest = Omit<IUser, 'id' | 'passwordHash'> & {
  password: string
}

export interface RegisterUseCaseResponse {
  user: Omit<IUser, 'passwordHash'>
}

export interface UpdateUserUseCase {
  id: string
  data: Partial<Pick<IUser, 'name' | 'urlCoverPhoto'>>
}

export interface AuthenticateRequest {
  email: string
  password: string
}

export interface AuthenticateResponse {
  user: IUser
}
