import clsx from 'clsx'

import styles from './index.module.scss'

export default function IconWrapper({ icon, handleClick, dark }) {
	return (
		<span
			className={clsx(styles.icon, { [styles.dark]: dark })}
			onClick={handleClick}
		>
			{icon}
		</span>
	)
}
