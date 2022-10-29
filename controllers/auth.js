import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createError } from '../error.js'
import { UserModel } from '../models/User.js'

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword
    })
    await newUser.save()

    res.status(200).send('User has been created')
  } catch (err) {
    next(err)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return next(createError(404, 'User not found'))
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user?.password
    )
    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong credentials'))
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)
    const { password, ...userData } = user._doc

    res
      .cookie('access_token', token, {
        httponly: true
      })
      .status(200)
      .json(userData)
  } catch (err) {
    next(err)
  }
}
