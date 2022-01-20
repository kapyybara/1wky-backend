import express from 'express'
import { getMessages, newMessage } from '../controllers/messageControllers.js'

const router = express.Router()

router.post('/', newMessage)

router.get('/:id', getMessages)

export default router