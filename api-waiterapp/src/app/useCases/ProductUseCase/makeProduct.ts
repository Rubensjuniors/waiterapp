import { ProductRepository } from '@/app/repositories/ProductRepository'

import { ProductUseCase } from '.'

export function makeProductUseCase() {
  const productRepository = new ProductRepository()
  const productUseCase = new ProductUseCase(productRepository)

  return productUseCase
}
