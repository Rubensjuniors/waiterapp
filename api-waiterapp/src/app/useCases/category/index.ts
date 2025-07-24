import { Request, Response } from 'express'
import { Category } from '../../models/Category'

class CategoryUseCases {
  async list(_req: Request, res: Response) {
    try {
      const categories = await Category.find()

      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, icon } = req.body

      if (!name) {
        return res.status(400).json({ error: 'Name is required' })
      }

      const categoryAlreadyExists = await Category.findOne({ name })

      if (categoryAlreadyExists) {
        return res.status(400).json({ error: 'Category already exists' })
      }

      const category = await Category.create({
        name,
        icon,
      })

      res.status(201).json(category)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { categoryId } = req.params

      if (!categoryId) {
        return res.status(400).json({ error: 'Category ID is required' })
      }

      await Category.findByIdAndDelete(categoryId)

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const categoryUseCases = new CategoryUseCases()
