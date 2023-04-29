import bcrypt from 'bcrypt'

import User from '../models/User.js'
import { HashFunction } from '../helper/index.js'

export const register = async (req, res) => {
	try {
		const hashedPassword = await HashFunction({
			password: req.body.password,
		})
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		})

		const user = await newUser.save()
		res.status(200).json({ data: user })
	} catch (error) {
		console.log(error)
		error.code === 11000
		switch (error.code) {
			case 11000:
				res.status(409).json('duplicate')
				break
			default:
				res.status(500).json({ error })
				break
		}
	}
}

export const login = async (req, res) => {
	try {
		console.log(res.body)
		const user = await User.findOne({ email: req.body.email })

		if (!user) return res.status(401).send('User not found')

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password,
		)
		if (!validPassword) {
			return res.status(401).json('Wrong password')
		}
		return res.status(200).json({ data: user })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error })
	}
}
