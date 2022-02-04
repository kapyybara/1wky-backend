import { ButtonBasic } from 'components/UI'
import styles from './index.module.scss'

function DeletePopup({ name, handleOff, handleAgree }) {
	return (
		<div className={styles.container}>
			<span className={styles.title}>
				Remove the conversation with {name}
			</span>
			<div className={styles.btn_container}>
				<ButtonBasic
					text={'Remove'}
					theme='thin'
					color='red'
					handleClick={handleAgree}
					/>
				<ButtonBasic
					text={'Cancel'}
					theme='thin'
					color='green'
					handleClick={handleOff}
				/>
			</div>
		</div>
	)
}

export default DeletePopup
