import NavItem from '../NavItem'
import styles from './index.module.scss'

export default function NavList({ children }) {
	return (
		<ul className={styles.navlist}>
			{children}
			{/* {navigators.map(navigator => (
				<NavItem  key={navigator.text} navigator={navigator} />
			))} */}
		</ul>
	)
}
