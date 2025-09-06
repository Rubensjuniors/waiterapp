import { z } from 'zod'

import { CategoryNotFoundError } from '@/app/errors/CategoryNotFoundError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeProductUseCase } from '@/app/useCases/ProductUseCase/makeProduct'

const paramsSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
})

export class ListProductsByCategoryController implements IController {
  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { categoryId } = paramsSchema.parse({ params })

      const productUseCase = makeProductUseCase()
      const products = await productUseCase.listProductsByCategory(categoryId)

      return {
        statusCode: 200,
        body: {
          data: products,
        },
      }
    } catch (error) {
      if (error instanceof CategoryNotFoundError) {
        return {
          statusCode: 404,
          body: {
            message: 'Category not found.',
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

      console.error('Error in ListProductsByCategoryController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
