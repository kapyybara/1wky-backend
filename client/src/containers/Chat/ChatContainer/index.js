import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'
import { forwardRef } from 'react'
import clsx from 'clsx'
import { getMessages } from 'data/slices/chatSlice'

function ChatContainer(
	{ children, labelImg, nonlabel, mini, next, id },
	ref,
) {
	const loading = useSelector(state => state.chat.loading)
	const dispatch = useDispatch()

	const getMoreMessages = () => {
		next !== -1 && dispatch(getMessages({ next, id }))
	}

	return (
		<div style={{ position: 'relative' }}>
			<div
				className={clsx(styles.container, {
					[styles.mini]: mini,
				})}
				ref={ref}
			>
				<span
					className={styles.seemore}
					onClick={getMoreMessages}
				>
					{next !== -1 && 'See more'}
				</span>
				{children}
			</div>
			{!nonlabel && (
				<span className={styles.imageLabel}>
					{loading ? (
						<Loading />
					) : (
						<img src={labelImg || defaultAvatar} alt="" />
					)}
				</span>
			)}
		</div>
	)
}

export default forwardRef(ChatContainer)
