import styles from './index.module.scss'

export default function Textarea({ value, handleChange }) {
	return (
		<textarea
			className={styles.textarea}
			value={value}
			onChange={handleChange}
			rows={2}
		/>
	)
}
