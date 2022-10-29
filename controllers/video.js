import { createError } from '../error.js'
import { VideoModel } from '../models/Video'

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new VideoModel({ userId: req.user.id, ...req.body })
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
}

export const updateVideo = async (req, res, next) => {
  try {
    const video = VideoModel.findById(req.params.id)
    if (!video) {
      return next(createError(404, 'Video not found'))
    }
    if (!req.user.id !== video.userId) {
      return next(createError(403, 'Invalid request'))
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedVideo)
  } catch (error) {
    next(error)
  }
}

export const deleteVideo = async (req, res, next) => {
  try {
    const video = VideoModel.findById(req.params.id)
    if (!video) {
      return next(createError(404, 'Video not found'))
    }
    if (!req.user.id !== video.userId) {
      return next(createError(403, 'Invalid request'))
    }

    await VideoModel.findByIdAndDelete(req.params.id)
    res.status(200).json('Video has been deleted')
  } catch (error) {
    next(error)
  }
}

export const getVideo = async (req, res, next) => {
  try {
    const video = await VideoModel.findById(req.params.id)
    res.status(200).json(video)
  } catch (error) {
    next(error)
  }
}
