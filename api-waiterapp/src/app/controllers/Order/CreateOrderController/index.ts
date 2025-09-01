import { z } from 'zod'

import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { OrderStatus } from '@/app/models/Order/types'
import { makeOrderUseCase } from '@/app/useCases/OrderUseCase/makeOrder'

const createOrderSchema = z.object({
  table: z.string().min(1, 'Table is required'),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.WAITING),
  products: z
    .array(
      z.object({
        product: z.string().min(1, 'Product ID is required'),
        quantity: z.number().positive('Quantity must be positive'),
      }),
    )
    .min(1, 'At least one product is required'),
})

export class CreateOrderController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const validatedData = createOrderSchema.parse(body)

      const orderUseCase = makeOrderUseCase()
      const result = await orderUseCase.createOrder(validatedData)

      return {
        statusCode: 201,
        body: {
          message: 'Order created successfully',
          data: result.order,
        },
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues,
          },
        }
      }

      console.error('Error in CreateOrderController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
