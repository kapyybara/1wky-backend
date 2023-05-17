import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
		},
		sendBy: {
			type: String,
		},
		text: {
			type: String,
		},
		read: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true },
)

const Message = mongoose.model('Message', MessageSchema)
export default Message
