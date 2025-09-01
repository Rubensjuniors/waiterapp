import { z } from 'zod'

import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeCategoryUseCase } from '@/app/useCases/CategoryUseCase/makeCategory'

const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  icon: z.string().min(1, 'Ícone é obrigatório'),
})

export class CreateCategoryController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, icon } = createCategorySchema.parse(body)

      const categoryUseCase = makeCategoryUseCase()

      // Check if category already exists
      const existingCategory = await categoryUseCase.findCategoryByName(name)
      if (existingCategory) {
        return {
          statusCode: 409,
          body: {
            message: 'Categoria já existe',
          },
        }
      }

      const result = await categoryUseCase.createCategory({
        name,
        icon,
      })

      return {
        statusCode: 201,
        body: {
          message: 'Categoria criada com sucesso',
          data: result.category,
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

      console.error('Erro no CreateCategoryController:', error)
      throw error
    }
  }
}
