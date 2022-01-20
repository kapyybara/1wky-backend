import { useEffect, useRef, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Feed from 'containers/User/Home/Feed'
import Sidebar from 'views/layouts/Sidebar'
import Toolbar from 'views/layouts/Toolbar'
import styles from './index.module.scss'
import { getTimeLine, setLoading } from 'data/slices/postSlice'
import { getMe } from 'data/slices/userSlice'

export default function Home() {
	const dispatch = useDispatch()
	const timelineRef = useRef()
	const { followings, myInfo } = useSelector(state => state.user)
	const { timeline, next, loading } = useSelector(
		state => state.post,
	)
	const userId = localStorage.getItem('userId')

	const [error, setError] = useState(false)

	const posts = useMemo(
		() =>
			timeline.map(post =>
				Object.assign(
					{},
					myInfo._id === post.userId ? myInfo : {},
					followings.filter(
						user => user._id === post.userId,
					)[0],
					post,
				),
			),
		[followings, myInfo, timeline],
	)

	useEffect(() => {
		const handleScroll = () => {
			const scrollCheck =
				timelineRef.current.scrollHeight -
				(timelineRef.current.scrollTop +
					timelineRef.current.clientHeight)
			if (scrollCheck < 600 && !loading && !error) {
				dispatch(setLoading(true))
				if (next >= 1) {
					dispatch(
						getTimeLine({
							userId,
							params: { page: next, limit: 5 },
						}),
					)
				} else {
					setError(true)
				}
			}
		}
		timelineRef.current.addEventListener('scroll', handleScroll)
		return () => {
			timelineRef.current?.removeEventListener(
				'scroll',
				handleScroll,
			)
		}
	}, [loading, next, error])

	return (
		<div className={styles.container}>
			<Feed
				posts={posts}
				addPost
				ref={timelineRef}
				loading={loading}
				error={error}
			/>
		</div>
	)
}
