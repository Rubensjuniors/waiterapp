import { z } from 'zod'

import { OrderNotFoundError } from '@/app/errors/OrderNotFoundError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { OrderStatus } from '@/app/models/Order/types'
import { makeOrderUseCase } from '@/app/useCases/OrderUseCase/makeOrder'

const paramsSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
})

const bodySchema = z.object({
  status: z.enum(OrderStatus),
})

export class UpdateOrderStatusController implements IController {
  async handle({ params, body }: IRequest): Promise<IResponse> {
    try {
      const { orderId } = paramsSchema.parse(params)
      const { status } = bodySchema.parse(body)

      const orderUseCase = makeOrderUseCase()
      const updatedOrder = await orderUseCase.updateOrderStatus({ id: orderId, status })

      if (!updatedOrder) {
        return {
          statusCode: 404,
          body: {
            message: 'Order not found.',
          },
        }
      }

      return {
        statusCode: 200,
        body: {
          message: 'Order status updated successfully',
          data: updatedOrder,
        },
      }
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        return {
          statusCode: 404,
          body: {
            message: 'Order not found.',
          },
        }
      }

      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues,
          },
        }
      }

      console.error('Error in UpdateOrderStatusController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
