import { IController, IResponse } from '@/app/interfaces/controllers'
import { makeOrderUseCase } from '@/app/useCases/OrderUseCase/makeOrder'

export class ListOrdersController implements IController {
  async handle(): Promise<IResponse> {
    try {
      const orderUseCase = makeOrderUseCase()
      const orders = await orderUseCase.listOrders()

      return {
        statusCode: 200,
        body: {
          data: orders,
        },
      }
    } catch (error) {
      console.error('Error in ListOrdersController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
