import { CategoryRepository } from '@/app/repositories/CategoryRepository'

import { CategoryUseCase } from '.'

export function makeCategoryUseCase() {
  const categoryRepository = new CategoryRepository()
  const categoryUseCase = new CategoryUseCase(categoryRepository)

  return categoryUseCase
}
