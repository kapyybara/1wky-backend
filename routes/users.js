import express from 'express'
import {
	deleteUser,
	followUser,
	getUser,
	updateUser,
} from '../controllers/userControllers.js'

const router = express.Router()

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.put('/:id/follow', followUser)
router.get('/:id/checkIsFollowUser', followUser)

export default router
