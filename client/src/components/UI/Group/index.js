import styles from './index.module.scss'
import clsx from 'clsx'

export default function Group({ children, label, right, scrollable,...props }) {
		return (
		<div
			className={clsx(styles.container, ...Object.keys(props), {[styles.scrollable]: scrollable})}
		>
			<span className={clsx(styles.label,{[styles.right]: right})}>{label}</span>
			<ul className={styles.group}>{children}</ul>
		</div>
	)
}
