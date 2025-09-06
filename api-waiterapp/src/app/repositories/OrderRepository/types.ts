import { IOrder, OrderStatus } from '@/app/models/Order/types'

export type ICreateOrder = Omit<IOrder, 'id' | 'createdAt'>

export interface IUpdateOrderStatus {
  id: string
  status: OrderStatus
}

export interface IOrderRepository {
  create(data: ICreateOrder): Promise<IOrder>
  list(): Promise<IOrder[]>
  findByTable(table: string): Promise<IOrder[] | null>
  updateStatus({ id, status }: IUpdateOrderStatus): Promise<IOrder | null>
  delete(id: string): Promise<null>
}
