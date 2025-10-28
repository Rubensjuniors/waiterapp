import './swagger/routes/auth'
import './swagger/routes/categories'
import './swagger/routes/orders'
import './swagger/routes/products'

import path from 'node:path'

import cookieParser from 'cookie-parser'
import cors from 'cors'
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

    const corsOptions = {
      origin: function (origin, callback) {
        const allowedOrigins = [
          'http://localhost:3000',
          'http://localhost:3001',
          'http://127.0.0.1:3000',
          'http://localhost:5173', // Se usar Vite
        ]

        console.log('Origin da requisição:', origin) // Para debug

        // Permite requisições sem origin (Postman, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Não permitido pelo CORS: ' + origin))
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
      ],
      exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
      maxAge: 86400, // 24 horas
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }

    app.use(cors(corsOptions))

    // Middleware adicional para debug
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`)
      next()
    })

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
