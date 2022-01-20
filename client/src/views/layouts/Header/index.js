import clsx from 'clsx'

import styles from './index.module.scss'
import mainLogo from 'assets/images/mainLogo.png'
import { ImageText } from 'components/UI'
import NavList from 'components/Header/NavList'
import NavItem from 'components/Header/NavItem'
import SearchBar from 'containers/User/SearchBar'

export default function Header({ type, navigators }) {
	return (
		<div
			className={clsx(styles.heading, styles[`padding${type}`])}
		>
			<ImageText
				image={mainLogo}
				text="!wVy"
				subText="the social media"
				size="large"
			/>
			{type === 'large' && <SearchBar />}
			<NavList>
				{navigators.map((item, index) => (
					<NavItem
						key={index}
						icon={item.icon}
						text={item.text}
						path={item.path}
					/>
				))}
			</NavList>
		</div>
	)
}
