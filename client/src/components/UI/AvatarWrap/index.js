import styles from './index.module.scss'
import defaultAvatar from 'assets/images/defaultAvatar.jpg'
    
export default function WrapAvatar({ url, handleClick }) {
    
	return (
		<div className={styles.container} onClick={handleClick}>
			<img src={url || defaultAvatar} alt="" />
		</div>
	)
}
