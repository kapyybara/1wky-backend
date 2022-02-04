import styles from './index.module.scss'
import clsx from 'clsx'
import { useState } from 'react'

export default function Group({
	children,
	label,
	right,
	maxItem,
	scrollable,
	...props
}) {
	const [seeAll, setSeeAll] = useState(false)

	return (
		<div
			className={clsx(styles.container, ...Object.keys(props), {
				[styles.scrollable]: scrollable,
			})}
		>
			<span
				className={clsx(styles.label, {
					[styles.right]: right,
				})}
			>
				{label}
			</span>
			<ul className={styles.group}>
				{seeAll
					? children
					: children.map((child, i) => i <= 3 && child)}
				{children.length > 4 && (
					<span
						className={styles.seemore}
						onClick={() => setSeeAll(prev => !prev)}
					>
						{seeAll ? 'Collapse' : 'See more'}
					</span>
				)}
			</ul>
		</div>
	)
}
