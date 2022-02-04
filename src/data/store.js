import { configureStore } from '@reduxjs/toolkit'

import {
	authReducer,
	postReducer,
	userReducer,
	chatReducer,
	backdropReducer,
} from './slices'

const store = configureStore({
	reducer: {
		auth: authReducer,
		post: postReducer,
		user: userReducer,
		chat: chatReducer,
		backdrop: backdropReducer,
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware({ serializableCheck: false }),
	],
})

export default store
