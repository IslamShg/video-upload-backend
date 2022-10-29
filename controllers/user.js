import { createError } from '../error.js'
import { UserModel } from '../models/User.js'

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
    const user = await UserModel.findById(req.params.id)
    res.status(200).json(user)
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
    await UserModel.findById(req.user.id, {
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
  } catch (error) {
    next(error)
  }
}

export const likeVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const dislikeVideo = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
