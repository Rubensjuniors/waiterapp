import { Product } from '@/app/models/Product'
import { IProduct } from '@/app/models/Product/types'

import { ICreateProduct, IProductRepository } from './types'

export class ProductRepository implements IProductRepository {
  async list(): Promise<IProduct[]> {
    const products = await Product.find().populate('category')

    return products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      price: product.price,
      ingredients: product.ingredients.map((ingredient) => ({
        name: ingredient.name || '',
        icon: ingredient.icon || '',
      })),
      category: product.category.toString(),
    }))
  }

  async create(data: ICreateProduct): Promise<IProduct> {
    const { _id, name, description, imagePath, price, ingredients, category } = await Product.create(data)

    return {
      id: _id.toString(),
      name,
      description,
      imagePath,
      price,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name || '',
        icon: ingredient.icon || '',
      })),
      category: category.toString(),
    }
  }

  async listByCategory(categoryId: string): Promise<IProduct[]> {
    const products = await Product.find({ category: categoryId }).populate('category')

    return products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      price: product.price,
      ingredients: product.ingredients.map((ingredient) => ({
        name: ingredient.name || '',
        icon: ingredient.icon || '',
      })),
      category: product.category.toString(),
    }))
  }

  async delete(id: string): Promise<null> {
    await Product.findByIdAndDelete(id)
    return null
  }
}
