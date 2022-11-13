import express from 'express'

import {
  addVideo,
  addVideoView,
  deleteVideo,
  getByTag,
  getFeedVideos,
  getRandomVideos,
  getTrendingVideos,
  getVideo,
  searchVideos,
  updateVideo
} from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addVideoView)
router.get('/trends', getTrendingVideos)
router.get('/random', getRandomVideos)
router.get('/sub', verifyToken, getFeedVideos)
router.get('/tags', getByTag)
router.get('/search', searchVideos)

export const videosRouter = router

// create a video
