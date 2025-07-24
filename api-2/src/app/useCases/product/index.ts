import { Product } from '../../models/Product'
import { Request, Response } from 'express'

class ProductUseCases {
  async list(_req: Request, res: Response) {
    try {
      const products = await Product.find()

      res.json(products)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, price, category, image, ingredients } = req.body
      const imagePath = req.file?.filename ?? ''
      const productBody = {
        name,
        description,
        price: Number(price),
        image,
        category,
        ingredients: ingredients ? JSON.parse(ingredients) : [],
        imagePath
      }

      const product = await Product.create(productBody)

      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async listByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params
      const product = await Product.findOne({ category: categoryId })

      res.json(product)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { productId } = req.params
      await Product.findByIdAndDelete(productId)

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export const productUseCases = new ProductUseCases()
