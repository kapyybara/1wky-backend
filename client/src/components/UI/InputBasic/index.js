import clsx from 'clsx'
import { useState } from 'react'
import styles from './index.module.scss'
import { ReactComponent as Openeye } from 'assets/icons/openeye.svg'
import { ReactComponent as Eye } from 'assets/icons/eye.svg'

export default function InputBasic(props) {
	const {
		label,
		id,
		onChange,
		fullWidth,
		type,
		errorMessage,
		...inputProps
	} = props
	const [focused, setFocused] = useState(false)

	const [hidePassword, setHidePassword] = useState(true)

	const handleFocus = e => {
		setFocused(true)
	}

	return (
		<div
			className={clsx(styles.container, {
				[styles.fullWidth]: fullWidth,
			})}
		>
			<label className={styles.title} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.input}
				id={id}
				type={
					type !== 'password'
						? type
						: hidePassword
						? 'password'
						: 'text'
				}
				onChange={onChange}
				onBlur={handleFocus}
				focused={focused.toString()}
				{...inputProps}
			/>
			{type === 'password' && (
				<span
					onClick={() => setHidePassword(!hidePassword)}
					className={styles.icon}
				>
					{hidePassword ? <Openeye /> : <Eye />}
				</span>
			)}
			<span className={styles.errorMessage}>
				{errorMessage}
			</span>
		</div>
	)
}
