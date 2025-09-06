import { z } from 'zod'

import { OrderNotFoundError } from '@/app/errors/OrderNotFoundError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeOrderUseCase } from '@/app/useCases/OrderUseCase/makeOrder'

const paramsSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
})

export class DeleteOrderController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { orderId } = paramsSchema.parse({ params })

      const orderUseCase = makeOrderUseCase()
      await orderUseCase.deleteOrder(orderId)

      return {
        statusCode: 200,
        body: {
          message: 'Order deleted successfully',
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

      console.error('Error in DeleteOrderController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
