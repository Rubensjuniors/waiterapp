import { IOrder, OrderStatus } from '@/app/models/Order/types'

export type CreateOrderUseCaseRequest = Omit<IOrder, 'id' | 'createdAt'>

export interface CreateOrderUseCaseResponse {
  order: IOrder
}

export interface UpdateOrderStatusUseCase {
  id: string
  status: OrderStatus
}
