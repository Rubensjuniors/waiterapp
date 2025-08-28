import { IProduct } from '@/app/models/Product/types'

export type ICreateProduct = Omit<IProduct, 'id'>

export interface IProductRepository {
  list(): Promise<IProduct[]>
  create(data: ICreateProduct): Promise<IProduct>
  listByCategory(categoryId: string): Promise<IProduct[]>
  delete(id: string): Promise<null>
}
