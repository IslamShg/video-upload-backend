import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
    img: {
      type: String,
      required: false,
      unique: false,
    },
    subscribers: {
      type: Number,
      default: 0
    },
    subscribedUsers: {
      type: [String]
    }
  },
  { timestamps: true }
)

export const UserModel = mongoose.model('User', UserSchema)
