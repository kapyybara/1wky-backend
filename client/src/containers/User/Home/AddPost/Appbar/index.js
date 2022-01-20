import styles from './index.module.scss'

export default function Appbar({ children }) {
	return <div className={styles.container}>{children}</div>
}
