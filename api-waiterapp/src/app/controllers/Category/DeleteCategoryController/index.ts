import { z } from 'zod'

import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeCategoryUseCase } from '@/app/useCases/CategoryUseCase/makeCategory'

const deleteCategorySchema = z.object({
  categoryId: z.string().min(1, 'ID da categoria é obrigatório'),
})

export class DeleteCategoryController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { categoryId } = deleteCategorySchema.parse(body)

      const categoryUseCase = makeCategoryUseCase()

      await categoryUseCase.deleteCategory(categoryId)

      return {
        statusCode: 200,
        body: {
          message: 'Categoria deletada com sucesso',
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

      console.error('Erro no DeleteCategoryController:', error)
      throw error
    }
  }
}
