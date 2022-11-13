import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    user: {
      name: {
        type: String
      },
      img: {
        type: String
      }
    },
    tags: {
      type: [String],
      default: []
    },
    likes: {
      type: [String],
      default: []
    },
    dislikes: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
)

export const VideoModel = mongoose.model('Video', VideoSchema)
