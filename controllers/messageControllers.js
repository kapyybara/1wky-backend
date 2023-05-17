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

export const  getMessages = async (req, res) => {
	try {
		console.log(req.params, req.query)
		let { page, limit } = req.query
		let next = parseInt(page) + 1
		if (parseInt(page) < 0) page = 1
		const skip = (parseInt(page) - 1) * limit
		const messages = await Message.find({
			conversationId: req.params.id,
		})
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(parseInt(limit))

		if (messages.length < limit) {
			next = -1
		}
		console.log({ length: messages.length, next })

		res.status(200).json({ messages: messages.reverse(), next })
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
}


export const deleteAllMessage = async (req, res) => {
	try {
		const messages = await Message.deleteMany()
		res.status(200).json("Xoas thanh cong ")

	} catch (error) {
		res.status(500).json(error)
	}
}
