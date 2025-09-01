import { IController, IRequest, IResponse } from '@/app/interfaces/controllers'
import { makeCategoryUseCase } from '@/app/useCases/CategoryUseCase/makeCategory'

export class ListCategoriesController implements IController {
  async handle(_request: IRequest): Promise<IResponse> {
    try {
      const categoryUseCase = makeCategoryUseCase()

      const categories = await categoryUseCase.listCategories()

      return {
        statusCode: 200,
        body: {
          message: 'Categorias listadas com sucesso',
          data: categories,
        },
      }
    } catch (error) {
      console.error('Erro no ListCategoriesController:', error)
      throw error
    }
  }
}
