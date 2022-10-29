import express from 'express'

import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo
} from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/vide/:id', getVideo)
router.put('/trend', getVideo)
router.put('/random', getVideo)
router.put('/sub', getVideo)

export const videosRouter = router

// create a video
