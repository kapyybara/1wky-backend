import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { postAPI } from 'apis/postAPI'
import { userAPI } from 'apis/userAPI'

const initialState = {
	userPosts: [],
	timeline: [],
	imageZooming: '',
	isZoom: false,
	next: 1,
	loading: false,
	currentUser: {
		profile: {},
		posts: [],
	},
}

export const getTimeLine = createAsyncThunk(
	'post/timeline',
	async (data, thunkAPI) => {
		try {
			const res = await postAPI.getTimeLine(data)
			return res?.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)

export const addPost = createAsyncThunk(
	'post/add',
	async (data, thunkAPI) => {
		try {
			const res = await postAPI.addPost(data)
			return res?.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)

export const likePost = createAsyncThunk(
	'post/like&dislike',
	async (data, thunkAPI) => {
		try {
			const res = await postAPI.likePost(data)
			return res?.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)

export const getProfile = createAsyncThunk(
	'post/getProfile',
	async (data, thunkAPI) => {
		try {
			const res = await userAPI.getById(data.id)
			const profile = res?.data.data

			const resPost = await postAPI.getPostsByUserId(
				res?.data.data._id,
			)

			const posts = resPost?.data.data.map(post => ({
				...res?.data.data,
				...post,
			}))
			return { profile, posts }
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)

const handleGetTimeLine = (state, action) => {
	state.timeline = [...state.timeline, ...action.payload.timeline]
	state.next = action.payload.next
	state.loading = false
}

const handleLikePost = (state, action) => {
	const { postId, likes } = action.payload
	state.timeline = state.timeline.map(post =>
		post._id === postId ? { ...post, likes } : post,
	)
	state.userPosts = state.userPosts.map(post =>
		post._id === postId ? { ...post, likes } : post,
	)
	state.currentUser.posts = state.currentUser.posts.map(post =>
		post._id === postId ? { ...post, likes } : post,
	)
}

const handleZoom = (state, action) => {
	state.isZoom = action.payload.isZoom
	state.imageZooming = action.payload.url
}

const handleAddPost = (state, action) => {
	state.timeline.unshift(action.payload.data)
}

const handleGetProfile = (state, action) => {
	state.currentUser.profile = action.payload.profile
	state.currentUser.posts = action.payload.posts
	state.loading = false
}

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		zoomImage: handleZoom,
		setLoading: (state, action) => {
			state.loading = action.payload
		},
	},
	extraReducers: {
		[getTimeLine.fulfilled]: handleGetTimeLine,
		[likePost.fulfilled]: handleLikePost,
		[addPost.fulfilled]: handleAddPost,
		[getProfile.fulfilled]: handleGetProfile,
	},
})

export const { zoomImage, setLoading } = postSlice.actions

export default postSlice.reducer
