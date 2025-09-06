import z from 'zod'

import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeOrderUseCase } from '@/app/useCases/OrderUseCase/makeOrder'

const tableSchema = z.object({
  table: z.string().min(1),
})

export class ListOrdersByTableController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { table } = tableSchema.parse(params)
      const orderUseCase = makeOrderUseCase()
      const orders = await orderUseCase.listOrdersByTable(table)

      return {
        statusCode: 200,
        body: {
          data: orders,
        },
      }
    } catch (error) {
      console.error('Error in ListOrdersController:', error)
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues[0].message,
          },
        }
      }

      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
