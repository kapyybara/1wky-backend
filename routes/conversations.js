import express from 'express'
import {
	createOrGetConversation,
	deleteConversation,
	getConversation,
	deleteAllConversation,
} from '../controllers/conversationControllers.js'

const router = express.Router()

router.post('/', createOrGetConversation)
router.get('/:id', getConversation)
router.delete('/:id', deleteConversation)
router.delete('/', deleteAllConversation)

export default router
