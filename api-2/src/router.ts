import { Router, RequestHandler } from 'express'
import { categoryUseCases } from './app/useCases/category'
import { productUseCases } from './app/useCases/product'
import { orderUseCases } from './app/useCases/order'
import multer from 'multer'
import path from 'node:path'

const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

//list all categories
router.get('/categories', categoryUseCases.list)

//create category
router.post('/categories', categoryUseCases.create as RequestHandler)

//list all products
router.get('/products', productUseCases.list)

//create product
router.post('/products', upload.single('image'), productUseCases.create)

// get product by category
router.get('/categories/:categoryId/products', productUseCases.listByCategory)

// list orders
router.get('/orders', orderUseCases.list)

// create order
router.post('/orders', orderUseCases.create)

// change order status
router.patch('/orders/:orderId', orderUseCases.updateStatus as RequestHandler)

// delete/cancel order
router.delete('/orders/:orderId', orderUseCases.delete)

// delete product
router.delete('/products/:productId', productUseCases.delete)

// delete category
router.delete('/categories/:categoryId', categoryUseCases.delete as RequestHandler)

export default router
