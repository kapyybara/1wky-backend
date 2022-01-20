import Conversation from '../models/Conversation.js'

export const createConversation = async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	})
	try {
		const savedConversation = await newConversation.save()
		res.status(200).send(savedConversation)
	} catch (err) {
		res.status(500).json(error)
	}
}

export const getConversation = async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: { $in: [req.params.id] },
		})
		res.status(200).json(conversation)
	} catch (error) {
		res.status(500).json(error)
	}
}

export const deleteConversation = async (req, res) => {
	try {
		const conversation = await Conversation.findByIdAndDelete(
			req.params.id,
		)
		res.status(200).json(req.params.id)
	} catch (error) {
		res.status(500).json(error)
	}
}
