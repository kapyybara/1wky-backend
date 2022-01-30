import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.scss'
import Feed from 'containers/User/Home/Feed'
import Info from './Info'
import { getProfile, setLoading } from 'data/slices/postSlice'

export default function PersonalPage() {
	const dispatch = useDispatch()
	const { loading, currentUser } = useSelector(state => state.post)
	const [currentPage, setCurrentPage] = useState('feed')
	const params = useParams()
	const feedRef = useRef()
	const userId = localStorage.getItem('userId')

	useEffect(() => {
		const mounted = true
		const getInfo = async () => {
			feedRef.current.scrollTo(0, 0)
			dispatch(setLoading(true))
			dispatch(getProfile({ id: params.id }))
		}
		mounted && getInfo()
	}, [params.id])

	return (
		<div className={styles.container}>
			<Feed
				ref={feedRef}
				firstChild={
					<Info
						info={currentUser.profile}
						loading={loading}
						current={currentPage}
						setCurrentPage={setCurrentPage}
						own={currentUser.profile._id === userId}
					/>
				}
				posts={currentUser?.posts}
			/>
		</div>
	)
}
