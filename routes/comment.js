import express from 'express'
import {
	createComment,
	deleteComment,
	getComment,
} from '../controllers/commentController.js'

const router = express.Router()

router.post('/', createComment)
router.delete('/:id', deleteComment)
router.get('/', getComment)
// router.get('/:id', getByCommentParentId)

export default router
