import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
	{
		createBy: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		postId: {
			type: String,
			required: true,
		},
		parentId: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true },
)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
