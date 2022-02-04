import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'
import { forwardRef, useEffect } from 'react'
import clsx from 'clsx'
import { getMessages, setNonScroll } from 'data/slices/chatSlice'

function ChatContainer(
	{ children, labelImg, nonlabel, mini, next, id },
	ref,
) {
	const loading = useSelector(state => state.chat.loading)
	const dispatch = useDispatch()

	const getMoreMessages = () => {
		if (next !== -1) {
			dispatch(getMessages({ next, id, more: true }))
		}
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
