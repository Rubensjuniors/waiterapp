import { ICategory } from '@/app/models/Category/types'

export type ICreateCategory = Omit<ICategory, 'id'>

export interface ICategoryRepository {
  create(data: ICreateCategory): Promise<ICategory>
  list(): Promise<ICategory[]>
  findByName(name: string): Promise<ICategory | null>
  delete(categoryId: string): Promise<null>
}
