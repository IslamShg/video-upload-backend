import express from 'express'

import { test } from '../controllers/user.js'

const router = express.Router()
router.get('/', test)

export const userRouter = router
