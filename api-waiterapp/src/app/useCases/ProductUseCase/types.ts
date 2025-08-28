import { IProduct } from '@/app/models/Product/types'

export type CreateProductUseCaseRequest = Omit<IProduct, 'id'>

export interface CreateProductUseCaseResponse {
  product: IProduct
}
