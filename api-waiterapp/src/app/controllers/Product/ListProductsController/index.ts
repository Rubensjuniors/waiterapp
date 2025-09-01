import { IController, IResponse } from '@/app/interfaces/controllers'
import { makeProductUseCase } from '@/app/useCases/ProductUseCase/makeProduct'

export class ListProductsController implements IController {
  async handle(): Promise<IResponse> {
    try {
      const productUseCase = makeProductUseCase()
      const products = await productUseCase.listProducts()

      return {
        statusCode: 200,
        body: {
          data: products,
        },
      }
    } catch (error) {
      console.error('Error in ListProductsController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
