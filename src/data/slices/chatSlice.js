import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { chatAPI } from 'apis/chatAPI'
import { toast } from 'react-toastify'
import { tuturu } from 'service/Notification'

const initialState = {
	conversations: [],
	currentConversation: {},
	messages: [],
	next: 1,
	loading: false,
	nonScroll: false,
}

export const getConversations = createAsyncThunk(
	'chat/getconversions',
	async (data, thunkAPI) => {
		try {
			const res = await chatAPI.getConversations(data)
			return {
				conversations: res?.data,
			}
		} catch (e) {
			thunkAPI.rejectWithValue(e)
		}
	},
)

export const getMessages = createAsyncThunk(
	'chat/getMessages',
	async (data, thunkAPI) => {
		try {
			const res = await chatAPI.getMessages(data)
			return {...res?.data, more: data?.more}
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	},
)

export const setConversation = createAsyncThunk(
	'chat/setConversation',
	async (data, thunkAPI) => {
		try {
			const resmessage = await chatAPI.getMessages({
				id: data._id,
				next: 1,
			})
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

const handleGetConversations = (state, action) => {
	state.conversations = action.payload.conversations
	state.currentConversation = action.payload.conversations[0]
    state.loading = false
}

const handleSendMessage = (state, action) => {
	state.messages.push(action.payload)
}

const handleUpdateMessage = (state, action) => {
	state.messages.push(action.payload)
	tuturu()
}

const handleCreateConversation = (state, action) => {
	state.conversations.push(action.payload)
}

const handleSetConversation = (state, action) => {
	state.currentConversation = action.payload.conversation
	state.messages = action.payload.messages.messages
	state.next = action.payload.messages.next
	state.loading = false
}

const handleRemoveConversation = (state, action) => {
	toast.success('Remove successfully!', {
		position: 'bottom-left',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	})
	console.log(action.payload)
	state.conversations.splice(
		state.conversations.indexOf(action.payload),
		1,
	)
}

const handleGetMessages = (state, action) => {
	state.messages.splice(0, 0, ...action.payload.messages)
	state.next = action.payload.next
    state.nonScroll = action.payload.more
}

const chatSlide = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setNonScroll: (state, action) => {
			state.nonScroll = action.payload
		},
		updateMessage: handleUpdateMessage,
	},
	extraReducers: {
		[getConversations.fulfilled]: handleGetConversations,
		[setConversation.fulfilled]: handleSetConversation,
		[sendMessage.fulfilled]: handleSendMessage,
		[createConversation.fulfilled]: handleCreateConversation,
		[removeConversation.fulfilled]: handleRemoveConversation,
		[getMessages.fulfilled]: handleGetMessages,
	},
})

export default chatSlide.reducer

export const { setLoading, updateMessage, setNonScroll } = chatSlide.actions
