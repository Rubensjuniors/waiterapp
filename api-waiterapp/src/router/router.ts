import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { makeRefreshController } from '@/app/controllers/Auth/RefreshTokenController/makeRefreshController'
import { makeSignInController } from '@/app/controllers/Auth/SignInController/makeSignInController'
import { makeSignUpController } from '@/app/controllers/Auth/SignUpController/makeSignUpController'

import { routeAdapter } from './routeAdapter'
// import { orderUseCases } from './app/useCases/order'
// import { productUseCases } from './app/useCases/product'

const router = Router()

// upload de imagens
const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

router.post('/auth/signup', upload.single('urlCoverPhoto'), routeAdapter(makeSignUpController()))
router.post('/auth/signin', routeAdapter(makeSignInController()))
router.patch('/auth/refresh', routeAdapter(makeRefreshController()))

// router.post('rota de deletar um user')

// //list all categories
// router.get('/categories', categoryUseCases.list)

// //create category
// router.post('/categories', categoryUseCases.create as RequestHandler)

// //list all products
// router.get('/products', productUseCases.list)

// //create product
// router.post('/products', upload.single('image'), productUseCases.create)

// // get product by category
// router.get('/categories/:categoryId/products', productUseCases.listByCategory)

// // list orders
// router.get('/orders', orderUseCases.list)

// // create order
// router.post('/orders', orderUseCases.create)

// // change order status
// router.patch('/orders/:orderId', orderUseCases.updateStatus as RequestHandler)

// // delete/cancel order
// router.delete('/orders/:orderId', orderUseCases.delete)

// // delete product
// router.delete('/products/:productId', productUseCases.delete)

// // delete category
// router.delete('/categories/:categoryId', categoryUseCases.delete as RequestHandler)

export default router
