import express from 'express'
import { deleteAllMessage, getMessages, newMessage } from '../controllers/messageControllers.js'

const router = express.Router()

router.post('/', newMessage)

router.get('/:id/', getMessages)
router.delete('/', deleteAllMessage)

export default router