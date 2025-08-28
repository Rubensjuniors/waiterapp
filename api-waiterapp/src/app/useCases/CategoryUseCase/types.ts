import { ICategory } from '@/app/models/Category/types'

export type CreateCategoryUseCaseRequest = Omit<ICategory, 'id'>

export interface CreateCategoryUseCaseResponse {
  category: ICategory
}
