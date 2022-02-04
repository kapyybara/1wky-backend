import clsx from 'clsx'

import styles from './index.module.scss'
import { ReactComponent as Personicon } from 'assets/icons/person.svg'

const Item = ({ icon, text, pointer }) => {
	return (
		<li
			className={clsx(styles.item, {
				[styles.pointer]: pointer,
			})}
		>
			{icon !== '' ? (
				<img src={icon} className={styles.icon} alt="" />
			) : (
				<span className={clsx(styles.iconSvg)}>
					<Personicon />
				</span>
			)}
			<span className={styles.text}>{text}</span>
		</li>
	)
}
export default function ListText({ list }) {
	return (
		<span>
			{list.length > 0 && (
				<ul className={styles.container}>
					{list.map(
						(item, index) =>
							index <= 5 && (
								<Item
									key={index}
									icon={item?.avatar || ''}
									text={
										item?.username || 'stranger'
									}
									avatar
								/>
							),
					)}
				</ul>
			)}
		</span>
	)
}
