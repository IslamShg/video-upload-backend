import { createError } from '../error.js'
import { CommentModel } from '../models/Comment.js'
import { VideoModel } from '../models/Video.js'

export const addComment = async (req, res, next) => {
  try {
    const comment = new CommentModel({ ...req.body, userId: req.user.id })
    const savedComment = await comment.save()
    res.status(200).json(savedComment)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId
  try {
    const comment = await CommentModel.findById(commentId)
    const video = await VideoModel.findById(comment?.videoId)

    if (
      !comment ||
      (comment.userId !== req.user.id && video?.userId !== req.user.id)
    ) {
      return next(createError(403, 'Invalid request'))
    }

    await CommentModel.findByIdAndDelete(commentId)
    res.status(200).json('Comment has been successfully deleted')
  } catch (error) {
    next(error)
  }
}

export const getVideoComments = async (req, res, next) => {
  const videoId = req.params.videoId
  try {
    const comments = await CommentModel.find({ videoId }).lean()

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
