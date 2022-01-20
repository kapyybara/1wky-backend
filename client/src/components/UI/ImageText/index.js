import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { ReactComponent as Personicon } from 'assets/icons/person.svg'

export default function ImageText({
	image,
	text,
	subText,
	date,
	size,
	type,
	path,
}) {
	return (
		<Link to={path || '/'}>
			<div className={styles.container}>
				{image !== '' ? (
					<img
						src={image}
						alt=""
						className={clsx(
							styles[`image${size || 'medium'}`],
							{
								[styles.avatar]: type === 'avatar',
							},
						)}
					/>
				) : (
					<span className={styles.iconSvg}>
						<Personicon />
					</span>
				)}
				<div className={styles.column}>
					<span
						className={styles[`text${size || 'medium'}`]}
					>
						{text}
						{subText && (
							<span
								className={styles.subText}
							>{`${subText}`}</span>
						)}
					</span>
					{date && <span className={styles.date}>{date}</span>}
				</div>
			</div>
		</Link>
	)
}
