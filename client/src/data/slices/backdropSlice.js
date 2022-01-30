import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	popup: false,
	backdrop: null,
}

const backdropSlice = createSlice({
	name: 'backdrop',
	initialState,
	reducers: {
		onPopup: (state, action) => {
			state.popup = true
			state.backdrop = action.payload
		},
		offPopup: (state, action) => {
			state.popup = false
			state.backdrop = null
		},
	},
})

export default backdropSlice.reducer

export const { onPopup, offPopup } = backdropSlice.actions
