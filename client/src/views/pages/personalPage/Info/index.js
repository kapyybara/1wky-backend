import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'
import { ReactComponent as Setting } from 'assets/icons/setting.svg'
import { ReactComponent as Camera } from 'assets/icons/camera.svg'
import { ReactComponent as Chat } from 'assets/icons/chat.svg'
import { ReactComponent as Follow } from 'assets/icons/follow.svg'
import { ReactComponent as Unfollow } from 'assets/icons/unfollow.svg'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom'
import { followUser, getMe } from 'data/slices/userSlice'
import { getTimeLine } from 'data/slices/postSlice'
import { createConversation } from 'data/slices/chatSlice'
import { useEffect, useState } from 'react'
import { IconWrapper } from 'components/UI'

export default function Info({ info, loading, own }) {
	const navigate = useNavigate()
	const userId = localStorage.getItem('userId')
	const dispatch = useDispatch()

	const { followings, myInfo } = useSelector(state => state.user)
	const { conversations } = useSelector(state => state.chat)

	const [existed, setExisted] = useState(true)

	const handleSettingClick = () => {
		navigate('/setting')
	}

	const handleFollow = () => {
		dispatch(followUser({ userId, followId: info._id })).then(
			() => {
				dispatch(getMe({ userId }))
			},
		)
	}

	useEffect(() => {
		setExisted(
			conversations.find(item =>
				item.members.includes(info._id),
			),
		)
	}, [conversations, info])

	const handleChatClick = () => {
		if (!existed) {
			dispatch(
				createConversation({
					senderId: userId,
					receiverId: info._id,
				}),
			)
		}
	}

	return (
		<div className={styles.container}>
			{loading ? (
				<Loading width="10rem" height="10rem" />
			) : (
				<>
					<div className={styles.left}>
						<span className={styles.avatar}>
							<img
								src={
									info.avatar !== ''
										? info.avatar
										: defaultAvatar
								}
								alt=""
							/>
						</span>
					</div>
					<div className={styles.right}>
						<span className={styles.username}>
							{info.username}
							{own ? (
								<span
									onClick={handleSettingClick}
									className={styles.settingIcon}
								>
									<Setting />
								</span>
							) : (
								<>
									<span
										onClick={handleFollow}
										className={styles.followIcon}
									>
										{myInfo.followings?.includes(
											info._id,
										) ? (
											<IconWrapper
												icon={<Unfollow />}
											/>
										) : (
											<IconWrapper
												icon={<Follow />}
											/>
										)}
									</span>
									{!existed ? (
										<span
											className={
												styles.followIcon
											}
											onClick={handleChatClick}
										>
											<IconWrapper
												icon={<Chat />}
											/>
										</span>
									) : (
										<span></span>
									)}
								</>
							)}
						</span>
						<div className={styles.subText}>
							<span>
								<strong>
									{info.followings?.length}
								</strong>
								{' followings'}
							</span>
							<span>
								<strong>
									{info.followers?.length}
								</strong>
								{' followers'}
							</span>
						</div>
						<span className={styles.description}>
							{info.description}
						</span>
					</div>
				</>
			)}
		</div>
	)
}
