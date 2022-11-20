import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    user: {
      userId: {
        type: String,
        required: true
      },
      avatarUrl: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
)

export const CommentModel = mongoose.model('Comment', CommentSchema)
