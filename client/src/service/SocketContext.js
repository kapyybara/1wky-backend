import {
	createContext,
	useState,
	useRef,
	useEffect,
	useCallback,
} from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import { useSelector } from 'react-redux'

const SocketContext = createContext()

const socket = io('ws://localhost:3007')

const ContextProvider = ({ children }) => {
	const userId = localStorage.getItem('userId')

	const [callAccepted, setCallAccepted] = useState(false)
	const [callEnded, setCallEnded] = useState(false)
	const [stream, setStream] = useState(null)
	const [name, setName] = useState('')
	const [call, setCall] = useState({})
	const [me, setMe] = useState('')
	const [users, setUsers] = useState([])

	const myVideo = useRef()
	const userVideo = useRef()
	let connectionRef = useRef()

	useEffect(() => {
		socket.emit('addUser', userId)
		socket.on('getMe', id => {
			setMe(id)
		})
		socket.on('getUsers', users => {
			console.log(users)
			setUsers(users)
		})
		socket.on('callUser', data => {
			setCall({
				isReceivedCall: true,
				from: data.from,
				signal: data.signal,
			})
		})
		socket.on('leaveCall', data => {
			setCallEnded(true)
		})
	}, [])

	const callUser = useCallback(
		(id, currentStream) => {
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: currentStream,
			})
			peer.on('signal', data => {
				console.log(users)
				socket.emit('callUser', {
					to: id,
					signalData: data,
					from: me,
				})
			})
			peer.on('stream', stream => {
				userVideo.current.srcObject = stream
			})
			socket.on('callAccepted', data => {
				peer.signal(data.signal)
				setCallAccepted(true)
			})
			connectionRef.current = peer
		},
		[me, users],
	)

	const answerCall = useCallback(
		currentStream => {
			setCallAccepted(true)
			const peer = new Peer({
				initiator: false,
				trickle: false,
				stream: currentStream,
			})
			peer.on('signal', data => {
				socket.emit('answerCall', {
					signal: data,
					to: call.from,
				})
			})
			peer.on('stream', stream => {
				userVideo.current.srcObject = stream
			})
			peer.signal(call.signal)
			connectionRef.current = peer
		},
		[call.from, call.signal],
	)

	const leaveCall = id => {
		const to = users.find(user => user.userId === id).socketId
		to && socket.emit('leaveCall', { to })

		setCallEnded(true)
		connectionRef.current.destroy()
		window.location.reload()
	}

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				callEnded,
				me,
				users,
				setName,
				leaveCall,
				answerCall,
				callUser,
				setStream,
				setCallEnded,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}

export { ContextProvider, SocketContext }

export default socket
