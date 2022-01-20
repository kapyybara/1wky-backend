import Feed from 'containers/User/Home/Feed'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import { postAPI } from 'apis/postAPI'

export default function SavedPost() {
	const { myInfo, followings } = useSelector(state => state.user)
	const [posts, setPosts] = useState()

	useEffect(() => {
		const getPosts = async () => {
			const res = await postAPI.getByIds(myInfo?.savePosts)
			setPosts(
				res.map(data =>
					Object.assign(
						{},
						myInfo._id === data?.data.data.userId
							? myInfo
							: {},
						followings.filter(
							user =>
								user._id === data?.data.data.userId,
						)[0],
						data?.data.data,
					),
				),
			)
		}
		myInfo?.savePosts && getPosts()
	}, [myInfo])

	return (
		<div className={styles.container}>
			<Feed posts={posts} />
		</div>
	)
}
