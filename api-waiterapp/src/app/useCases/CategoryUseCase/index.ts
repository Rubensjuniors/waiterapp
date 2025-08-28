import { ICategoryRepository } from '@/app/repositories/CategoryRepository/types'

import { CreateCategoryUseCaseRequest, CreateCategoryUseCaseResponse } from './types'

export class CategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async createCategory({ name, icon }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const category = await this.categoryRepository.create({
      name,
      icon,
    })

    return {
      category,
    }
  }

  async listCategories() {
    return await this.categoryRepository.list()
  }

  async findCategoryByName(name: string) {
    return await this.categoryRepository.findByName(name)
  }

  async deleteCategory(id: string) {
    await this.categoryRepository.delete(id)
  }
}
