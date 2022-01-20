import Message from '../models/Message.js'

export const newMessage = async (req, res) => {
	console.log(req.body)
	const newMessage = new Message(req.body)
	try {
		const savedMessage = await newMessage.save()
		res.status(200).json(savedMessage)
	} catch (err) {
		res.status(500).json(err)
	}
}

export const getMessages = async (req, res) => {
	try {
		const allMessages = await Message.find({
			conversationId: req.params.id,
		})
		res.status(200).json(allMessages)
	} catch (error) {
		res.status(500).json(error)
	}
}
