const io = require('socket.io')(3007, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST'],
	},
})

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
		io.to(data.to).emit('callAccepted', { signal: data.signal })
	})

	socket.on('leaveCall', data => {
		console.log(data)
		io.to(data.to).emit('leaveCall', data)
	})
})
