import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chatAPI } from 'apis/chatAPI'
import { toast } from 'react-toastify'
import { tuturu } from 'service/Notification'

const initialState = {
	conversations: [],
	currentConversation: {},
	messages: [],
	loading: false,
}

export const getConversations = createAsyncThunk(
	'chat/getconversions',
	async (data, thunkAPI) => {
		try {
			const res = await chatAPI.getConversations(data)
			const resMessage = await chatAPI.getMessages(
				res?.data[0]._id,
			)
			return {
				conversations: res?.data,
				messages: resMessage?.data,
			}
		} catch (e) {
			thunkAPI.rejectWithValue(e)
		}
	},
)

const handleGetConversations = (state, action) => {
	state.conversations = action.payload.conversations
	state.currentConversation = action.payload.conversations[0]
	state.messages = action.payload.messages
	state.loading = false
}

export const setConversation = createAsyncThunk(
	'chat/setConversation',
	async (data, thunkAPI) => {
		try {
			const resmessage = await chatAPI.getMessages(data._id)
			return {
				id: data,
				messages: resmessage?.data,
				conversation: data,
			}
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	},
)

const handleSetConversation = (state, action) => {
	state.currentConversation = action.payload.conversation
	state.messages = action.payload.messages
	state.loading = false
}

export const sendMessage = createAsyncThunk(
	'chat/sendMessage',
	async (data, thunkAPI) => {
		try {
			const res = await chatAPI.sendMessage(data)
			return res?.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	},
)

const handleSendMessage = (state, action) => {
	state.messages.push(action.payload)
}

const handleUpdateMessage = (state, action) => {
	state.messages.push(action.payload)
	tuturu()
}

export const createConversation = createAsyncThunk(
	'chat/createConversation',
	async (data, thunkAPI) => {
		try {
			const res = await chatAPI.createConversation(data)
			return res?.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	},
)

const handleCreateConversation = (state, action) => {
	state.conversations.push(action.payload)
}

export const removeConversation = createAsyncThunk(
	'chat/removeConversation',
	async (data, thunkAPI) => {
		try {
			chatAPI.removeConversation(data)
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	},
)

const handleRemoveConversation = (state, action) => {
	toast.success('Remove successfully!', {
		position: "bottom-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		});
	console.log(action.payload)
	state.conversations.splice(
		state.conversations.indexOf(action.payload),
		1,
	)
}

const chatSlide = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		updateMessage: handleUpdateMessage,
	},
	extraReducers: {
		[getConversations.fulfilled]: handleGetConversations,
		[setConversation.fulfilled]: handleSetConversation,
		[sendMessage.fulfilled]: handleSendMessage,
		[createConversation.fulfilled]: handleCreateConversation,
		[removeConversation.fulfilled]: handleRemoveConversation,
	},
})

export default chatSlide.reducer

export const { setLoading, updateMessage } = chatSlide.actions
