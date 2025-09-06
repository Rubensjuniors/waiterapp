import { Order } from '@/app/models/Order'
import { IOrder } from '@/app/models/Order/types'

import { ICreateOrder, IOrderRepository, IUpdateOrderStatus } from './types'

export class OrderRepository implements IOrderRepository {
  async create(data: ICreateOrder): Promise<IOrder> {
    const { _id, table, status, createdAt, products } = await Order.create(data)

    return {
      id: _id.toString(),
      table,
      status,
      createdAt,
      products: products.map((product) => ({
        product: product.product.toString(),
        quantity: product.quantity,
      })),
    }
  }

  async list(): Promise<IOrder[]> {
    const orders = await Order.find().lean()

    return orders.map((order) => ({
      id: order._id.toString(),
      table: order.table,
      status: order.status,
      createdAt: order.createdAt,
      products: order.products.map((product) => ({
        product: product.product.toString(),
        quantity: product.quantity,
      })),
    }))
  }

  async findByTable(table: string): Promise<IOrder[] | null> {
    const orders = await Order.find({ table }).lean()

    if (!orders) {
      return null
    }

    return orders.map((order) => ({
      id: order._id.toString(),
      table: order.table,
      status: order.status,
      createdAt: order.createdAt,
      products: order.products.map((product) => ({
        product: product.product.toString(),
        quantity: product.quantity,
      })),
    }))
  }

  async updateStatus({ id, status }: IUpdateOrderStatus): Promise<IOrder | null> {
    const updatedOrder = await Order.findByIdAndUpdate(id, { $set: { status } }, { new: true })

    if (!updatedOrder) {
      return null
    }

    return {
      id: updatedOrder._id.toString(),
      table: updatedOrder.table,
      status: updatedOrder.status,
      createdAt: updatedOrder.createdAt,
      products: updatedOrder.products.map((item) => ({
        product: item.product.toString(),
        quantity: item.quantity,
      })),
    }
  }

  async delete(id: string): Promise<null> {
    await Order.findByIdAndDelete(id)
    return null
  }
}
