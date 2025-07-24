import { Request, Response } from 'express'
import { Order } from '../../models/Order'

class OrderUseCases {
  async create(req: Request, res: Response) {
    try {
      const { table, products } = req.body

      const order = await Order.create({ table, products })

      res.status(201).json(order)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async list(_req: Request, res: Response) {
    try {
      const orders = await Order.find().sort({
        createdAt: -1
      }).populate('products.product')

      res.json(orders)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { orderId } = req.params
      const { status } = req.body

      if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
        return res.status(400).json({ error: `Status should be one of these: 'WAITING', 'IN_PRODUCTION', 'DONE'` })
      }

      await Order.findByIdAndUpdate(orderId, { status })

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { orderId } = req.params
      await Order.findByIdAndDelete(orderId)

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const orderUseCases = new OrderUseCases()
