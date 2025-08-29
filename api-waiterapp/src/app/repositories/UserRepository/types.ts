import { IUser } from '@/app/models/User/types'

export type ICreateUser = Omit<IUser, 'id' | 'createdAt'>
export type IUpdate = Partial<Pick<IUser, 'name' | 'urlCoverPhoto'>>

export interface IUpdateUser {
  id: string
  data: IUpdate
}

export type IOutput = Omit<IUser, 'passwordHash'>

export interface IUserRepository {
  create(data: ICreateUser): Promise<IOutput>
  update({ id, data }: IUpdateUser): Promise<IOutput | null>
  findByEmail(email: string): Promise<IUser | null>
  delete(id: string): Promise<null>
}
