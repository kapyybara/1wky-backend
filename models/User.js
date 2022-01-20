import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 4,
			max: 20,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			max: 50,
		},
		password: {
			type: String,
			required: true,
			min: 6,
		},
		avatar: {
			type: String,
			default: '',
		},
		coverPicture: {
			type: String,
			default: '',
		},
		followers: {
			type: Array,
			default: [],
		},
		followings: {
			type: Array,
			default: [],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			default: '',
			max: 50,
		},
		city: {
			type: String,
			default: '',
			max: 50,
		},
		relationship: {
			type: Number,
			enum: [1, 2, 3],
		},
		savePosts: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true },
)

const User = mongoose.model('User', UserSchema)
export default User
