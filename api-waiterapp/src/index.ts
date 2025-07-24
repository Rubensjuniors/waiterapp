import express from 'express'
import mongoose from 'mongoose'
import router from './router'
import path from 'node:path'

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    console.log('Connected to MongoDB')
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
