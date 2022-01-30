import { useSelector } from 'react-redux'

import { Group, GroupItem, Divider } from 'components/UI'
import styles from './index.module.scss'

export default function Sidebar() {
	const { followings, followers } = useSelector(state => state.user)

	return (
		<div className={styles.container}>
			<Group label="Followings" fullWidth start>
				{followings.map(item => (
					<GroupItem
						key={item._id}
						icon={item.avatar}
						text={item.username}
						id={item._id}
						pointer
					/>
				))}
			</Group>
			<Divider />
			<Group label="Followers" fullWidth start>
				{followers.map(item => (
					<GroupItem
						key={item._id}
						icon={item.avatar}
						text={item.username}
						pointer
						id={item._id}
					/>
				))}
			</Group>
			<Divider />
		</div>
	)
}
