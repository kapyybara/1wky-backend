import User from '../models/User.js'

export const searchUser = async (req, res) => {
	try {
		const reg = new RegExp(req.query.username, 'i')
		const users = await User.find({ username: reg })
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json(error)
	}
}
