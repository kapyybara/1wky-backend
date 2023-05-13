import Comment from '../models/Comment.js'

export const createComment = async (req, res) => {
	console.log(req.body)
	const newCommnet = new Comment(req.body)
	try {
		const savedComment = await newCommnet.save()
		res.status(201).json({ data: savedComment })
	} catch (error) {
		res.status(500).json({ error })
	}
}
export const deleteComment = async (req, res) => {
	try {
		console.log(req.params.id)
		const comment = await Comment.findById(req.params.id)
		console.log(comment)
		await comment.deleteOne({ _id: req.params.id })
		res.status(200).json('The comment have been deleted')
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const getComment = async (req, res) => {
	try {
		const { postId, parentId } = req.query
		if (postId) {
			const comments = await Comment.find({ postId: postId })
			return res.status(200).json({ data: comments })
		}
		if (parentId) {
			const comments = await Comment.find({
				parentId: parentId,
			})
			return res.status(200).json({ data: comments })
		}
		return res.status(404)
	} catch (error) {
		res.status(500).json({ error })
	}
}
