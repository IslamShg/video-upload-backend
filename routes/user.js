import express from 'express'

import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser
} from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

router.put('/:id', verifyToken, updateUser)
router.put('/sub/:id', verifyToken, subscribeUser)
router.put('/unsub/:id', verifyToken, unsubscribeUser)
router.delete('/:id', verifyToken, deleteUser)
router.get('/find/:id', verifyToken, getUser)
router.put('/like/:videoId', verifyToken, likeVideo)
router.put('/dislike/:videoId', verifyToken, dislikeVideo)

export const userRouter = router
