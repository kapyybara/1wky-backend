import Post from '../models/Post.js'
import User from '../models/User.js'

export const createPost = async (req, res) => {
	const newPost = new Post(req.body)
	try {
		const savedPost = await newPost.save()
		res.status(201).json({ data: savedPost })
	} catch (error) {
		res.status(409).json({ error })
	}
}

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body })
			res.status(200).json('The post have been updated')
		} else {
			res.status(403).json('You can update only your post!')
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post.userId === req.body.userId) {
			await post.deleteOne({ _id: req.params.id })
			res.status(200).json('The post have been deleted')
		} else {
			res.status(403).json('You can delete only your post!')
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const likePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post.likes.includes(req.body.userId)) {
			try {
				await post.updateOne({
					$push: { likes: req.body.userId },
				})
				res.status(200).json({postId: req.params.id,likes: [...post.likes, req.body.userId]})
			} catch (error) {
				res.status(500).json({ error })
			}
		} else {
			try {
				await post.updateOne({
					$pull: { likes: req.body.userId },
				})
				// res.status(200).json(
				// 	'You have been unliked this post',
				// 	)
				res.status(200).json({postId: req.params.id,likes: post.likes.filter(id => id !== req.body.userId)})
			} catch (error) {
				res.status(500).json({ error })
			}
		}
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		res.status(200).json({ data: post })
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const getTimeline = async (req, res) => {
	try {
		const { page, limit } = req.query
		let next = parseInt(page) + 1
		if (parseInt(page) < 0) parseInt(page) = 1
		const skip = (parseInt(page) - 1) * limit
		const currentUser = await User.findById(req.params.userId)
		const timeline = await Post.find({
			userId: {
				$in: [currentUser._id, ...currentUser.followings],
			},
		})
			.sort({ createdAt: 'descending' })
			.skip(skip)
			.limit(parseInt(limit))

		if (timeline.length === 0) next = -1
		res.status(200).json({ timeline, next })
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const getPostsByUserId = async (req, res) => {
	try {
		const userId = req.params.id
		const posts = await Post.find({userId: userId}).limit(10)
		res.status(200).json({ data:posts })

	} catch (error) {
		res.status(500).json({ error })
	}
}
export const savePost = async (req, res) => {
	try {
		const user = await User.findById(req.body.userId)
		if(!user.savePosts.includes(req.params.id)) {
			await user.updateOne({
				$push: {savePosts: req.params.id}
			})
			return res.status(200).json({status:'saved post successfully', id: req.params.id})
		} else {
			await user.updateOne({
				$pull: {savePosts: req.params.id}
			})
			return res.status(200).json({status:'unsaved post successfully', id: req.params.id})

		}
	} catch (error) {
		console.log(error)
		res.status(500).json({ error })
	}
}
