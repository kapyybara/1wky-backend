import { useState, useEffect, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Divider, HorSlider } from 'components/UI'
import ChatItem from './ChatItem'
import ChatContainer from './ChatContainer'
import ChatInput from './ChatInput'
import styles from './index.module.scss'
import Conversation from 'containers/Chat/Conversation'
import {
	getConversations,
	sendMessage,
	setLoading,
	updateMessage,
} from 'data/slices/chatSlice'
import { getOnlineUsers } from 'data/slices/userSlice'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import socket from 'service/SocketContext'
import ChatInfo from './ChatInfo'
import { ReactComponent as Option } from 'assets/icons/threedot.svg'

export default function Chat({ mini }) {
	const dispatch = useDispatch()
	const scrollRef = useRef()

	const userId = localStorage.getItem('userId')
	const { conversations, messages, loading, currentConversation } =
		useSelector(state => state.chat)
	const me = useSelector(state => state.user)

	const [labelImg, setLabelImg] = useState(defaultAvatar)
	const [message, setMessage] = useState('')

	useEffect(() => {
		if (userId) {
			dispatch(setLoading(true))
			dispatch(getConversations(userId))
		}
		socket.on('getUsers', users => {
			dispatch(getOnlineUsers(users))
		})
	}, [userId])

	useEffect(() => {
		socket.on('getMessage', ({ senderId, message }) => {
			const createdAt = new Date()
			dispatch(
				updateMessage({
					conversationId: currentConversation._id,
					sendBy: senderId,
					text: message,
					createdAt,
				}),
			)
		})
		return () => {
			socket.removeListener('getMessage')
		}
	}, [currentConversation])

	useEffect(() => {
		scrollRef?.current &&
			scrollRef?.current.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const handleSubmit = e => {
		const receiverId = currentConversation.members.find(id => {
			return id !== userId
		})

		//socket.io
		socket.emit('sendMessage', {
			senderId: me.myInfo._id,
			receiverId,
			message: message,
		})

		dispatch(
			sendMessage({
				conversationId: currentConversation._id,
				sendBy: me.myInfo._id,
				text: message,
			}),
		)
		setMessage('')
	}

	if (!mini) {
		return (
			<div className={styles.container}>
				<div className={styles.left}>
					{conversations?.length > 0 &&
						conversations.map((conversation, index) => (
							<Conversation
								key={index}
								conversation={conversation}
								setLabelImg={setLabelImg}
								current={
									currentConversation._id ===
									conversation._id
								}
							/>
						))}
				</div>
				<div className={styles.right}>
					<ChatInfo />
					<ChatContainer
						labelImg={labelImg}
						loading={loading}
						ref={scrollRef}
						nonlabel
						heigthFill
					>
						{messages.map((message, index) => (
							<ChatItem
								ref={
									index === messages.length - 1
										? scrollRef
										: null
								}
								key={index}
								text={message.text}
								mine={
									message.sendBy === me.myInfo._id
								}
								createdAt={message.createdAt}
							/>
						))}
					</ChatContainer>
					<ChatInput
						value={message}
						setValue={setMessage}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.miniChat}>
			{/* <span className={styles.label}>Recently</span> */}
			<HorSlider>
				{conversations?.length > 0 &&
					conversations.map((conversation, index) => (
						<Conversation
							key={index}
							conversation={conversation}
							setLabelImg={setLabelImg}
							mini
						/>
					))}
			</HorSlider>
			<ChatContainer
				labelImg={labelImg}
				loading={loading}
				ref={scrollRef}
				mini
			>
				{messages.map((message, index) => (
					<ChatItem
						ref={
							index === messages.length - 1
								? scrollRef
								: null
						}
						key={index}
						text={message.text}
						mine={message.sendBy === me.myInfo._id}
						createdAt={message.createdAt}
						mini
					/>
				))}
			</ChatContainer>
			<ChatInput
				value={message}
				setValue={setMessage}
				handleSubmit={handleSubmit}
			/>
		</div>
	)
}
