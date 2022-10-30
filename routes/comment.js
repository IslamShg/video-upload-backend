import express from 'express'

import {
  addComment,
  deleteComment,
  getVideoComments
} from '../controllers/comment.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, addComment)
router.delete('/:commentId', verifyToken, deleteComment)
router.get('/:videoId', verifyToken, getVideoComments)

export const commentRouter = router
