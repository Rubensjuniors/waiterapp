import path from 'node:path'

import express from 'express'
import mongoose from 'mongoose'

import { env } from './env'
import router from './router'

mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    const app = express()

    const PORT = process.env.PORT || 4001

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
    app.use(express.json())
    app.use(router)

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err)
  })
