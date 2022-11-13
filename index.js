import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { userRouter } from './routes/user.js'
import { videosRouter } from './routes/videos.js'
import { commentRouter } from './routes/comment.js'
import { authRouter } from './routes/auth.js'

const app = express()
dotenv.config()
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Successful db connection'))
    .catch((e) => console.log('Failed to connect db: ', e))
}

app.use(express.json())
app.use(cookieParser())
app.use('/api/users', userRouter)
app.use('/api/videos', videosRouter)
app.use('/api/comments', commentRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {``
  const status = err.status || 500
  const message = err.message || 'Something went wrong'

  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(8800, connect)
