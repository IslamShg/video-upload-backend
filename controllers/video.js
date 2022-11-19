import { createError } from '../error.js'
import { VideoModel } from '../models/Video.js'
import { UserModel } from '../models/User.js'

export const addVideo = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id)
    const newVideo = new VideoModel({
      user: {
        name: user?.name,
        img: user?.img,
        subscribers: user?.subscribers
      },
      nn: null,
      userId: req.user.id,
      ...req.body
    })
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

export const addVideoView = async (req, res, next) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    })
    res.status(200).json('Video view has been increased.')
  } catch (error) {
    next(error)
  }
}

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await VideoModel.aggregate([{ $sample: { size: 10 } }])
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

export const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await VideoModel.find().sort({ views: -1 })
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

export const getFeedVideos = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id)
    const subscribedChannels = user?.subscribedUsers
    const list = await Promise.all(
      subscribedChannels?.map((channelId) =>
        VideoModel.find({ userId: channelId })
      )
    )
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
  } catch (error) {
    next(error)
  }
}

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags?.split(',') ?? []

  try {
    const videos = await VideoModel.find({ tags: { $in: tags } }).limit(20)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

export const searchVideos = async (req, res, next) => {
  const query = req.query.q
  try {
    const videos = await VideoModel.find({
      title: { $regex: query, $options: 'i' }
    }).limit(40)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}
