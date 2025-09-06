import './swagger/routes/auth'
import './swagger/routes/categories'
import './swagger/routes/orders'
import './swagger/routes/products'

import path from 'node:path'

import cookieParser from 'cookie-parser'
import express from 'express'
import mongoose from 'mongoose'

import { env } from './env'
import router from './router/router'
import { specs, swaggerUi } from './swagger/swagger'

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    const app = express()

    const PORT = process.env.PORT || 4001

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(cookieParser())
    app.use(express.json())

    // Configuração do Swagger
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Waiter App API Documentation',
      }),
    )

    app.use(router)

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err)
  })
