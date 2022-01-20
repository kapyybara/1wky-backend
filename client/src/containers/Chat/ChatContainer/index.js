import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
import { ReactComponent as Loading } from 'assets/icons/loading.svg'
import { forwardRef } from 'react'
import clsx from 'clsx'

function ChatContainer({ children, labelImg, nonlabel, mini }, ref) {
	const loading = useSelector(state => state.chat.loading)
	return (
		<div style={{ position: 'relative' }}>
			<div
				className={clsx(styles.container, {
					[styles.mini]: mini,
				})}
				ref={ref}
			>
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
