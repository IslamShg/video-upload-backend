import { createError } from '../error.js'
import { UserModel } from '../models/User.js'
import { VideoModel } from '../models/Video.js'

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(createError(403, 'Incorrect request configuration'))
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const userData = await UserModel.findOne({ _id: req.params.id })
    const { password, ...data } = userData?._doc

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(createError(403, 'Incorrect request configuration'))
  }

  try {
    await UserModel.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted')
  } catch (error) {
    next(error)
  }
}

export const subscribeUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }
    })
    await UserModel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }
    })
    res.status(200).json('Successfully subscribed.')
  } catch (error) {
    next(error)
  }
}

export const unsubscribeUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    })
    await UserModel.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }
    })
    res.status(200).json('Successfully subscribed.')
  } catch (error) {
    next(error)
  }
}

export const likeVideo = async (req, res, next) => {
  const userId = req.user.id
  const videoId = req.params.videoId
  try {
    const video = await VideoModel.findById(videoId)

    if (video?.likes.includes(userId)) {
      await VideoModel.findByIdAndUpdate(videoId, {
        $pull: { likes: userId }
      })
    } else {
      await VideoModel.findByIdAndUpdate(videoId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId }
      })
    }

    res.status(200).json('The video has been liked')
  } catch (error) {
    next(error)
  }
}

export const dislikeVideo = async (req, res, next) => {
  const userId = req.user.id
  const videoId = req.params.videoId
  try {
    const video = await VideoModel.findById(videoId)

    if (video?.dislikes.includes(userId)) {
      await VideoModel.findByIdAndUpdate(videoId, {
        $pull: { dislikes: userId }
      })
    } else {
      await VideoModel.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId }
      })
    }

    res.status(200).json('The video has been disliked')
  } catch (error) {
    next(error)
  }
}
