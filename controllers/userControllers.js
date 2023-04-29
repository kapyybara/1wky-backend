import User from '../models/User.js'
import { HashFunction } from '../helper/index.js'

export const updateUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				req.body.password = await HashFunction({
					password: req.body.password,
				})
			} catch (error) {
				res.status(500).json({ error })
			}
		}
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			})
			res.status(200).json({
				status: 'Account has been update',
				data: user,
			})
		} catch (error) {
			res.status(500).json({ error })
		}
	} else {
		res.status(403).json('You can update only your account')
	}
}

export const deleteUser = async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.deleteOne({ _id: req.params.id })
			res.status(200).json('Account has been deleted')
		} catch (error) {
			res.status(500).json({ error })
		}
	} else {
		res.status(403).json("You can't delete only your account")
	}
}

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		const { password, updatedAt, ...other } = user._doc
		res.status(200).json({ data: other })
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const followUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id)
			const currentUser = await User.findById(req.body.userId)
			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({
					$push: { followers: req.body.userId },
				})
				await currentUser.updateOne({
					$push: { followings: req.params.id },
				})
				return res.status(200).json('user have been unfollowed')
			} else {
				await user.updateOne({
					$pull: { followers: req.body.userId },
				})
				await currentUser.updateOne({
					$pull: { followings: req.params.id },
				})
				return res.status(200).json('user have been follow')
			}
		} catch (erroror) {
			res.status(500).json({ error })
		}
	} else {
		res.status(403).json("you can't follow yourself")
	}
}


export const checkIsFollowUser = async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id)
			if (user.followers.includes(req.body.userId)) {
				return res.status(200).json('NO')
			} else {
				return res.status(200).json('YES')
			}
		} catch (erroror) {
			res.status(500).json({ error })
		}
	} else {
		res.status(403).json("you can't follow yourself")
	}
}
