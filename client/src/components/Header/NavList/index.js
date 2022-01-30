import NavItem from '../NavItem'
import styles from './index.module.scss'

export default function NavList({ children }) {
	return (
		<ul className={styles.navlist}>
			{children}
		</ul>
	)
}
