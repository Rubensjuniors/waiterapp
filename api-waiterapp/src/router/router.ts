/* eslint-disable max-len */
import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { makeLogoutController } from '@/app/controllers/Auth/LogoutController/makeLogoutController'
import { makeRefreshController } from '@/app/controllers/Auth/RefreshTokenController/makeRefreshController'
import { makeSignInController } from '@/app/controllers/Auth/SignInController/makeSignInController'
import { makeSignUpController } from '@/app/controllers/Auth/SignUpController/makeSignUpController'
import { makeCreateCategoryController } from '@/app/controllers/Category/CreateCategoryController/makeCreateCategoryController'
import { makeDeleteCategoryController } from '@/app/controllers/Category/DeleteCategoryController/makeDeleteCategoryController'
import { makeListCategoriesController } from '@/app/controllers/Category/ListCategoriesController/makeListCategoriesController'
import { makeCreateOrderController } from '@/app/controllers/Order/CreateOrderController/makeCreateOrderController'
import { makeDeleteOrderController } from '@/app/controllers/Order/DeleteOrderController/makeDeleteOrderController'
import { makeListOrdersController } from '@/app/controllers/Order/ListOrdersController/makeListOrdersController'
import { makeUpdateOrderStatusController } from '@/app/controllers/Order/UpdateOrderStatusController/makeUpdateOrderStatusController'
import { makeCreateProductController } from '@/app/controllers/Product/CreateProductController/makeCreateProductController'
import { makeDeleteProductController } from '@/app/controllers/Product/DeleteProductController/makeDeleteProductController'
import { makeListProductsByCategoryController } from '@/app/controllers/Product/ListProductsByCategoryController/makeListProductsByCategoryController'
import { makeListProductsController } from '@/app/controllers/Product/ListProductsController/makeListProductsController'
import { restaurantAuthMiddleware } from '@/app/middlewares'

import { routeAdapter } from './routeAdapter'

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
router.post('/auth/logout', routeAdapter(makeLogoutController()))

// Category routes
router.get('/categories', routeAdapter(makeListCategoriesController()))
router.post('/categories', restaurantAuthMiddleware, routeAdapter(makeCreateCategoryController()))
router.delete(
  '/categories/:categoryId',
  restaurantAuthMiddleware,
  routeAdapter(makeDeleteCategoryController()),
)
router.get('/categories/:categoryId/products', routeAdapter(makeListProductsByCategoryController()))

// Product routes
router.get('/products', routeAdapter(makeListProductsController()))
router.post(
  '/products',
  upload.single('image'),
  restaurantAuthMiddleware,
  routeAdapter(makeCreateProductController()),
)
router.delete('/products/:productId', restaurantAuthMiddleware, routeAdapter(makeDeleteProductController()))

// Order routes
router.get('/orders', routeAdapter(makeListOrdersController()))
router.post('/orders', routeAdapter(makeCreateOrderController()))
router.patch('/orders/:orderId', routeAdapter(makeUpdateOrderStatusController()))
router.delete('/orders/:orderId', routeAdapter(makeDeleteOrderController()))

export default router
