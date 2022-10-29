import express from 'express'

import { signIn, signUp } from '../controllers/auth.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

export const authRouter = router

// Create a user
// Sign in
// Google Auth
