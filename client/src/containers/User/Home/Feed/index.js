import { forwardRef } from 'react'

import Post from '../../Post'
import AddPost from '../AddPost'
import styles from './index.module.scss'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'

function Feed({ posts, addPost, loading, error, firstChild }, ref) {
	return (
		<div className={styles.container} ref={ref}>
			{firstChild}
			{addPost && <AddPost />}
			{posts &&
				posts.map((post, index) => (
					<Post key={index} post={post} index={index} />
				))}
			{loading && <Loading width="6rem" height="6rem" />}
			{error && <h1>Nothing to load</h1>}
		</div>
	)
}
export default forwardRef(Feed)
