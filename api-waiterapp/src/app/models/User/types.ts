export enum UserRole {
  RESTAURANT = 'RESTAURANT',
  COMMON = 'COMMON',
}

export interface IUser {
  id: string
  name: string
  urlCoverPhoto: string
  email: string
  passwordHash: string
  role: UserRole
  createdAt: Date
}
