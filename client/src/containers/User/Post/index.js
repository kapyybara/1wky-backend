import * as timeago from 'timeago.js'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
import Topbar from './Topbar'
import Body from './Body'
import Bottombar from './Bottombar'
import { ReactComponent as Option } from 'assets/icons/threedot.svg'
import { ReactComponent as Like } from 'assets/icons/like.svg'
import { ReactComponent as Comment } from 'assets/icons/comment.svg'
import { Dropdown, DropItem } from 'components/UI'
import { ReactComponent as Saveicon } from 'assets/icons/save.svg'
import { ReactComponent as WarningIcon } from 'assets/icons/warning.svg'
import { ReactComponent as Download } from 'assets/icons/download.svg'
import { ReactComponent as Url } from 'assets/icons/url.svg'
import { useDispatch } from 'react-redux'
import { likePost } from 'data/slices/postSlice'
import { useEffect, useState } from 'react'
import { List } from 'components/UI'
import { ImageText } from 'components/UI'
import { followUser, savePost, getMe } from 'data/slices/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Post({ post, index }) {
	const dispatch = useDispatch()
	const { cacheUsers } = useSelector(state => state.user)
	const userId = localStorage.getItem('userId')
	const navigate = useNavigate()

	const [zoom, setZoom] = useState(false)
	const [likes, setLikes] = useState([])

	const menuItems =
		userId === post.userId
			? [
					{
						icon: <Saveicon />,
						text: 'Save this post',
						handleClick: async () => {
							const res = await dispatch(
								savePost({
									userId,
									postId: post._id,
								}),
							)
							if (
								res.payload.status ===
								'saved post successfully'
							)
								toast.success(
									'Post have been saved!',
									{
										position: 'bottom-left',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									},
								)
							else if (
								res.payload.status ===
								'unsaved post successfully'
							)
								toast.success(
									'Post have been unsaved!',
									{
										position: 'bottom-left',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									},
								)
						},
					},
					{
						icon: <Url />,
						text: "Copy post's URL",
						handleClick: () => {},
					},
					{
						icon: <Download />,
						text: 'Download this image',
						handleClick: () => {},
					},
			  ]
			: [
					{
						icon: <Saveicon />,
						text: 'Save this post',
						handleClick: async () => {
							const res = await dispatch(
								savePost({
									userId,
									postId: post._id,
								}),
							)
							if (
								res.payload.status ===
								'saved post successfully'
							)
								toast.success(
									'Post have been saved!',
									{
										position: 'bottom-left',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									},
								)
							else if (
								res.payload.status ===
								'unsaved post successfully'
							)
								toast.success(
									'Post have been unsaved!',
									{
										position: 'bottom-left',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									},
								)
						},
					},
					{
						icon: <WarningIcon />,
						text: 'Unfollow this user',
						handleClick: async () => {
							const res = await dispatch(
								followUser({
									userId,
									followId: post.userId,
								}),
							)
							dispatch(getMe({ userId }))
							navigate('/')
						},
					},
					{
						icon: <Url />,
						text: "Copy post's URL",
						handleClick: () => {},
					},
					{
						icon: <Download />,
						text: 'Download this image',
						handleClick: () => {},
					},
			  ]

	const handleLikePost = () => {
		dispatch(likePost({ userId, postId: post._id }))
	}

	useEffect(() => {
		const handleGetLikedUserInfo = async () => {
			let likedUsers = post.likes.map(id => {
				let user = cacheUsers.filter(
					user => user._id === id,
				)[0]
				return user
			})
			setLikes(likedUsers)
		}
		handleGetLikedUserInfo()
	}, [post.likes, cacheUsers])

	return (
		<div
			className={styles.container}
			style={{ zIndex: 99 - index }}
		>
			<Topbar>
				<ImageText
					size="medium"
					type="avatar"
					image={post?.avatar || ''}
					text={post.username}
					date={timeago.format(post.createdAt)}
					path={`/user/${post.userId}`}
				/>
				<Dropdown icon={<Option />}>
					{menuItems.map(item => (
						<DropItem
							key={item.text}
							icon={item.icon}
							text={item.text}
							handleClick={item.handleClick}
						/>
					))}
				</Dropdown>
			</Topbar>
			<Body
				content={post.content}
				img={post.img}
				zoom={zoom}
				setZoom={setZoom}
			/>
			<Bottombar>
				<DropItem
					icon={<Like />}
					text={post.likes.length || '0'}
					autoWidth
					liked={post.likes.includes(userId)}
					handleClick={handleLikePost}
					hoverToMore
				>
					<List list={likes} />
				</DropItem>
				<DropItem
					icon={<Comment />}
					text={'-'}
					autoWidth
					handleClick={() => {}}
				/>
			</Bottombar>
		</div>
	)
}
