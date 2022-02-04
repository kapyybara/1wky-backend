import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { authAPI } from 'apis/authAPI'

const initialState = {}
export const login = createAsyncThunk(
	'user/login',
	async (data, thunkAPI) => {
		try {
			const res = await authAPI.login(data)
			return res?.data
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	},
)

const handleLogin = (state, action) => {
	localStorage.setItem('userId', action.payload.data._id)
}

export const register = createAsyncThunk(
	'user/register',
	async (data, thunkAPI) => {
		try {
			const res = await authAPI.register(data)
			return res?.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
)

const handleRegister = (state, action) => {}


const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[login.fulfilled]: handleLogin,
		[register.fulfilled]: handleRegister,
	},
})

export default authSlice.reducer
