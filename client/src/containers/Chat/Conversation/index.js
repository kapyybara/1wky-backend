import WrapAvatar from 'components/UI/AvatarWrap'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './index.module.scss'
import { IconWrapper } from 'components/UI'
import { ReactComponent as Phone } from 'assets/icons/phone.svg'
import { ReactComponent as Trash } from 'assets/icons/trash.svg'
import {
	removeConversation,
	setConversation,
	setLoading,
} from 'data/slices/chatSlice'
import { onPopup, offPopup } from 'data/slices/backdropSlice'
import clsx from 'clsx'
import DeletePopup from './DeletePopup'

export default function Conversation({
	conversation,
	mini,
	setLabelImg,
	current,
}) {
	const navigative = useNavigate()
	const dispatch = useDispatch()
	const { followings, myInfo } = useSelector(state => state.user)
	const { currentConversation } = useSelector(state => state.chat)
	const [user, setUser] = useState()

	const handleClick = () => {
		dispatch(setLoading(true))
		dispatch(setConversation(conversation))
		setLabelImg(user?.avatar)
	}

	useEffect(() => {
		if (conversation.members?.length <= 2) {
			const friendId = conversation.members.find(
				user => user !== myInfo._id,
			)
			const friend = followings.find(
				user => user._id === friendId,
			)
			setUser(friend)
			if (currentConversation._id === conversation._id)
				setLabelImg(friend?.avatar)
		}
	}, [followings, conversation, myInfo])

	const handleCall = () => {
		navigative(`/meetting/${user._id}`)
	}

	const handleAgree = () => {
		dispatch(offPopup())
		dispatch(removeConversation(conversation._id))
	}

	const handleRemove = () => {
		dispatch(
			onPopup(
				<DeletePopup
					name={user.username}
					handleOff={() => {
						dispatch(offPopup())
					}}
					handleAgree={handleAgree}
				/>,
			),
		)
		//
	}

	return (
		<>
			{mini ? (
				<div
					onClick={handleClick}
					className={styles.container_mini}
				>
					<WrapAvatar
						url={user?.avatar}
						handleClick={user?.handleClick}
					/>
					<span
						className={styles.phone_mini}
						onClick={handleCall}
					>
						<IconWrapper icon={<Phone />} />
					</span>
				</div>
			) : (
				<div
					onClick={handleClick}
					className={clsx(styles.container, {
						[styles.current]: current,
					})}
				>
					<span className={styles.group}>
						<WrapAvatar
							url={user?.avatar}
							handleClick={user?.handleClick}
						/>
						<span className={styles.username}>
							{user?.username} <span>online</span>
						</span>
					</span>

					<span className={styles.group}>
						<span
							className={styles.phone}
							onClick={handleRemove}
						>
							<IconWrapper icon={<Trash />} />
						</span>
						<span
							className={styles.phone}
							onClick={handleCall}
						>
							<IconWrapper icon={<Phone />} />
						</span>
					</span>
				</div>
			)}
		</>
	)
}
