import styles from './index.module.scss'

export default function Slider({ children }) {
	return <div className={styles.container}>{children}</div>
}
