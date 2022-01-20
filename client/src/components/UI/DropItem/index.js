import clsx from 'clsx'
import { IconWrapper } from '..'
import Drop from '../Dropdown'
import styles from './index.module.scss'

export default function GroupItem({
	children,
	icon,
	text,
	pointer,
	handleClick,
	autoWidth,
	liked,
	hoverToMore,
}) {
	return (
		<li className={styles.wrapper}>
			<span
				className={clsx(styles.container, {
					[styles.pointer]: pointer,
					[styles.autoWidth]: autoWidth,
					[styles.liked]: liked,
				})}
				onClick={handleClick}
			>
				{text && <span className={clsx(styles.text)}>{text}</span>}
				{icon && <IconWrapper icon={icon} />}
			</span>
			{hoverToMore && (
				<span className={styles.more}>{children}</span>
			)}
		</li>
	)
}
