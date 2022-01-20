import { ReactComponent as SendIcon } from 'assets/icons/send.svg'
import { toast } from 'react-toastify'
import styles from './index.module.scss'

export default function ChatInput({ value, setValue, handleSubmit }) {
	return (
		<div className={styles.container}>
			<input
				type="text"
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyPress={e =>
					e.key === 'Enter'
						? value
							? handleSubmit()
							: () =>
									toast.warn('Nothing to send!', {
										position: 'bottom-left',
										autoClose: 3000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									})
						: {}
				}
			/>
			<SendIcon
				onClick={
					value
						? handleSubmit
						: () => {
								toast.warn('Nothing to send!', {
									position: 'bottom-left',
									autoClose: 3000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: 'dark',
								})
						  }
				}
			/>
		</div>
	)
}
