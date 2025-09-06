import { IOrderRepository } from '@/app/repositories/OrderRepository/types'

import { CreateOrderUseCaseRequest, CreateOrderUseCaseResponse, UpdateOrderStatusUseCase } from './types'

export class OrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async createOrder({
    table,
    status,
    products,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.orderRepository.create({
      table,
      status,
      products,
    })

    return {
      order,
    }
  }

  async listOrders() {
    return await this.orderRepository.list()
  }

  async listOrdersByTable(table: string) {
    return await this.orderRepository.findByTable(table)
  }

  async updateOrderStatus({ id, status }: UpdateOrderStatusUseCase) {
    const updatedOrder = await this.orderRepository.updateStatus({ id, status })
    return updatedOrder
  }

  async deleteOrder(id: string) {
    await this.orderRepository.delete(id)
  }
}
