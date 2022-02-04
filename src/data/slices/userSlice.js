import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { userAPI } from 'apis/userAPI'
import { postAPI } from 'apis/postAPI'

const initialState = {
	myInfo: {},
	followers: [],
	followings: [],
	cacheUsers: [],
	currentUser: {},
	onlineUsers: [],
}

export const getMe = createAsyncThunk(
	'user/getme',
	async (data, thunkAPI) => {
		try {
			const res = await userAPI.getMe(data)
			const myInfo = res?.data?.data
			const followers = await userAPI.getByIds(myInfo.followers)
			const followings = await userAPI.getByIds(
				myInfo.followings,
			)
			return {
				myInfo,
				followers: followers.map(follow => follow?.data.data),
				followings: followings.map(
					follow => follow?.data.data,
				),
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
)

export const getById = createAsyncThunk(
	'user/getById',
	async (data, thunkAPI) => {
		try {
			const res = await userAPI.getById(data)
			return res?.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
)

export const savePost = createAsyncThunk(
	'user/savePost',
	async (data, thunkAPI) => {
		try {
			const res = await postAPI.savePost(data)
			return res?.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
)

export const followUser = createAsyncThunk(
	'user/follow',
	async (data, thunkAPI) => {
		try {
			const res = await userAPI.followUser(data)
			return { status: res?.data, id: data.followId }
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
)

const handleGetMe = (state, action) => {
	state.myInfo = action.payload.myInfo
	state.followers = action.payload.followers
	state.followings = action.payload.followings
	state.cacheUsers = [
		action.payload.myInfo,
		...action.payload.followers,
		...action.payload.followings,
	].filter(
		(value, index, self) =>
			index === self.findIndex(t => t._id === value._id),
	)
}

const handleGetById = (state, action) => {}

const handleGetOnlineUsers = (state, action) => {
	state.onlineUsers = action.payload
}

const handleSavePost = (state, action) => {
	if (!state.myInfo.savePosts.includes(action.payload.id)) {
		state.myInfo.savePosts.push(action.payload.id)
	} else {
		state.myInfo.savePosts.splice(
			state.myInfo.savePosts.indexOf(action.payload.id),
			1,
		)
	}
}

const handleFollowUser = (state, action) => {


}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getOnlineUsers: handleGetOnlineUsers,
	},
	extraReducers: {
		[getMe.fulfilled]: handleGetMe,
		[getById.fulfilled]: handleGetById,
		[savePost.fulfilled]: handleSavePost,
		[followUser.fulfilled]: handleFollowUser,
	},
})

export default userSlice.reducer

export const { getOnlineUsers } = userSlice.actions
