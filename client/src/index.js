import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ContextProvider } from 'service/SocketContext'

import 'react-toastify/dist/ReactToastify.css'
import './index.scss'
import App from './App'
import store from './data/store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ContextProvider>
				<BrowserRouter>
					<App />
					<ToastContainer pauseOnFocusLoss={false} />
				</BrowserRouter>
			</ContextProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)
