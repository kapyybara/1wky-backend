import clsx from 'clsx'

import styles from './index.module.scss'

export default function Divider({ text }) {
	return (
		<div
			className={clsx(styles.dividerContainer, {
				[styles.jcc]: !text,
			})}
		>
			<span
				className={clsx(styles.divider, {
					[styles.fullWidth]: !text,
				})}
			></span>
			{text && <span>{text}</span>}
			{text && <span className={styles.divider}></span>}
		</div>
	)
}
