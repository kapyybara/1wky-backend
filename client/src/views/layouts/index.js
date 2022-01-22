import { useSelector } from 'react-redux'

import Header from './Header'
import githubLogo from 'assets/images/githubLogo.png'
import { ReactComponent as PersonIcon } from 'assets/icons/person.svg'
import { ReactComponent as Chat } from 'assets/icons/chaticon.svg'
import { ReactComponent as Home } from 'assets/icons/home.svg'
import { ReactComponent as About } from 'assets/icons/about.svg'
import styles from './index.module.scss'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import { IconWrapper } from 'components/UI'

export default function Layout({ children, type, side }) {
	const userInfo = useSelector(state => state.user.myInfo)

	const navigators = [
		{
			path: '/',
			text: 'Home',
			icon: <IconWrapper icon={<Home />} />,
		},
		{
			path: '/chat',
			text: 'Chat',
			icon: <IconWrapper icon={<Chat />} />,
		},
		{
			//! thêm path sau khi có id
			path: `/user/${userInfo._id}`,
			text: userInfo.username || '',
			icon:
				userInfo.avatar !== '' ? (
					<IconWrapper
						icon={<img src={userInfo.avatar} alt="" />}
					/>
				) : (
					<IconWrapper icon={<PersonIcon />} />
				),
		},
	]

	const infomations = [
		{
			path: 'https://github.com/1wku',
			text: 'My GitHub',
			icon: (
				<IconWrapper icon={<img src={githubLogo} alt="" />} />
			),
		},
		{
			path: 'https://github.com/1wku',
			text: 'About',
			icon: <IconWrapper icon={<About />} />,
		},
	]

	return (
		<>
			<Header
				type={type}
				navigators={
					type === 'large' ? navigators : infomations
				}
			/>
			{type === 'large' ? (
				<div className={styles.container}>
					{side && <Sidebar />}
					{children}
					{side && <Toolbar />}
				</div>
			) : (
				children
			)}
			{/* {type === 'large' && <Footer />} */}
		</>
	)
}
