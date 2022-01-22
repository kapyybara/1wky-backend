import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import { createServer } from 'http'
import { Server } from 'socket.io'

/* ------------------------------- add router ------------------------------- */
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'
import conversationsRoute from './routes/conversations.js'
import messagesRoute from './routes/messages.js'
import searchRoute from './routes/search.js'

dotenv.config()

const __dirname = path.resolve()

const app = express()
const PORT = process.env.PORT || 3009

const server = createServer(app)
const io = new Server(server)

//? middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(
	cors({
		origin: true,
		credentials: true,
		origin: '*',
		method: ['GET', 'POST'],
	}),
)
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(
	compression({
		level: 6,
		threshold: 100000,
	}),
)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('	/', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'client', 'build', 'index.html'),
		)
	})
}

//? connect to database
mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() =>
		server.listen(PORT, () => {
			console.log('Connected to MongoDB !')
			console.log(`Back sever is running at PORT:${PORT} !!`)
		}),
	)
	.catch(err => console.log(err))

//? use routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)
app.use('/api/conversations', conversationsRoute)
app.use('/api/messages', messagesRoute)
app.use('/api/search', searchRoute)

let users = []

const addUser = (userId, socketId) => {
	!users.some(user => user.userId === userId) &&
		users.push({ userId, socketId })
}

const removeUser = socketId => {
	users = users.filter(user => user.socketId !== socketId)
}

const getUser = userId => {
	return users.find(user => user.userId === userId)
}

io.on('connection', socket => {
	console.log('a user connected ' + socket.id)

	socket.on('addUser', userId => {
		addUser(userId, socket.id)
		io.emit('getUsers', users)
		io.emit('getMe', socket.id)
	})

	socket.on('disconnect', () => {
		console.log('a user disconnected ' + socket.id)
		removeUser(socket.id)
		io.emit('getUsers', users)
		socket.broadcast.emit('callEnded')
	})

	socket.on('sendMessage', ({ senderId, receiverId, message }) => {
		const receiverUser = getUser(receiverId)
		io.to(receiverUser?.socketId).emit('getMessage', {
			senderId,
			message,
		})
	})

	socket.on('callUser', data => {
		const res = {
			signal: data.signalData,
			from: data.from,
		}
		io.to(data.to).emit('callUser', res)
	})

	socket.on('answerCall', data => {
		io.to(data.to).emit('callAccepted', {
			signal: data.signal,
		})
	})

	socket.on('leaveCall', data => {
		console.log(data)
		io.to(data.to).emit('leaveCall', data)
	})
})
