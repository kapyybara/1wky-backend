import express from 'express'
import {
	createPost,
	updatePost,
	deletePost,
	likePost,
	getPost,
	getTimeline,
	getPostsByUserId,
	savePost,
} from '../controllers/postControllers.js'

const router = express.Router()

router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/save', savePost)
router.get('/timeline/:userId', getTimeline)
router.get('/all/:id', getPostsByUserId)

export default router
