import styles from './index.module.scss'

export default function Bottombar({ children }) {
	return <div className={styles.container}>{children}</div>
}
