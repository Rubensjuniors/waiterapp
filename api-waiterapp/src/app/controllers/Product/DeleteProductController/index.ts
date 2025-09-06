import { z } from 'zod'

import { ProductNotFoundError } from '@/app/errors/ProductNotFoundError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeProductUseCase } from '@/app/useCases/ProductUseCase/makeProduct'

const paramsSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
})

export class DeleteProductController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { productId } = paramsSchema.parse(params)

      const productUseCase = makeProductUseCase()
      await productUseCase.deleteProduct(productId)

      return {
        statusCode: 200,
        body: {
          message: 'Product deleted successfully',
        },
      }
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return {
          statusCode: 404,
          body: {
            message: 'Product not found.',
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

      console.error('Error in DeleteProductController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
