export enum OrderStatus {
  WAITING = 'WAITING',
  IN_PRODUCTION = 'IN_PRODUCTION',
  DONE = 'DONE',
}

export interface IOrderProduct {
  product: string
  quantity: number
}

export interface IOrder {
  id: string
  table: string
  status: OrderStatus
  createdAt: Date
  products: IOrderProduct[]
}
