import clsx from 'clsx'

import styles from './index.module.scss'
import { LoadingSpin } from 'components/UI'

export default function BottonBasic({
	text,
	theme,
	color,
	fullWidth,
	handleClick,
	disabled,
	isLoading,
}) {
	return (
		<button
			onClick={handleClick}
			disabled={disabled || isLoading}
			className={clsx(
				styles.button,
				styles[`button${theme}`],
				styles[`button${color}`],
				{
					[styles.fullWidth]: fullWidth,
					[styles.disabled]: disabled,
				},
			)}
		>
			{isLoading ? <LoadingSpin /> : text}
		</button>
	)
}
