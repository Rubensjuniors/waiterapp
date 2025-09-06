import { Category } from '@/app/models/Category'
import { ICategory } from '@/app/models/Category/types'

import { ICategoryRepository, ICreateCategory } from './types'

export class CategoryRepository implements ICategoryRepository {
  async create(data: ICreateCategory): Promise<ICategory> {
    const { _id, name, icon } = await Category.create(data)

    return {
      id: _id.toString(),
      name,
      icon,
    }
  }

  async list(): Promise<ICategory[]> {
    const categories = await Category.find({}).lean()

    return categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      icon: category.icon,
    }))
  }

  async findByName(name: string): Promise<ICategory | null> {
    const category = await Category.findOne({ name })
    if (!category) return null

    return {
      id: category._id.toString(),
      name: category.name,
      icon: category.icon,
    }
  }

  async delete(categoryId: string): Promise<null> {
    await Category.findByIdAndDelete(categoryId)
    return null
  }
}
