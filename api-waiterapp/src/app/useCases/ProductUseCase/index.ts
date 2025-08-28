import { IProductRepository } from '@/app/repositories/ProductRepository/types'

import { CreateProductUseCaseRequest, CreateProductUseCaseResponse } from './types'

export class ProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async createProduct({
    name,
    description,
    imagePath,
    price,
    ingredients,
    category,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const product = await this.productRepository.create({
      name,
      description,
      imagePath,
      price,
      ingredients,
      category,
    })

    return {
      product,
    }
  }

  async listProducts() {
    return await this.productRepository.list()
  }

  async listProductsByCategory(categoryId: string) {
    return await this.productRepository.listByCategory(categoryId)
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id)
  }
}
