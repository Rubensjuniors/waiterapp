import { OrderRepository } from '@/app/repositories/OrderRepository'

import { OrderUseCase } from '.'

export function makeOrderUseCase() {
  const orderRepository = new OrderRepository()
  const orderUseCase = new OrderUseCase(orderRepository)

  return orderUseCase
}
