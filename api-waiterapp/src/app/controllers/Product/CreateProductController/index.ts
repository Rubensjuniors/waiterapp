import { z } from 'zod'

import { CategoryNotFoundError } from '@/app/errors/CategoryNotFoundError'
import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeProductUseCase } from '@/app/useCases/ProductUseCase/makeProduct'

const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
      }),
    )
    .default([]),
})

export class CreateProductController implements IController {
  async handle({ body, file }: IRequest): Promise<IResponse> {
    try {
      const validatedData = createProductSchema.parse({
        ...body,
        price: Number(body.price),
        ingredients: body.ingredients ? JSON.parse(body.ingredients) : [],
      })

      const imagePath = file ? `/uploads/${file.filename}` : ''

      const productUseCase = makeProductUseCase()
      const result = await productUseCase.createProduct({
        ...validatedData,
        imagePath,
      })

      return {
        statusCode: 201,
        body: {
          message: 'Product created successfully',
          data: result.product,
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

      console.error('Error in CreateProductController:', error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      }
    }
  }
}
