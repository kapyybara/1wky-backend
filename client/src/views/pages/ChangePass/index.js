import { ButtonBasic, InputBasic } from 'components/UI'
import styles from './index.module.scss'
import { useState } from 'react'
import { userAPI } from 'apis/userAPI'
import { toast } from 'react-toastify'
import { authAPI } from 'apis/authAPI'
import { useSelector, useDispatch } from 'react-redux'
import { login } from 'data/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function ChangePass() {
	const userId = localStorage.getItem('userId')
	const dispatch = useDispatch()
    const navigate = useNavigate()
	const [values, setValues] = useState({
		old: '',
		new: '',
		confirm: '',
	})
	const { myInfo } = useSelector(state => state.user)
	const inputs = [
		{
			label: 'Old password',
			name: 'oldPassword',
			type: 'password',
			required: true,
			value: values.old,
			onChange: e =>
				setValues({ ...values, old: e.target.value }),
		},
		{
			label: 'New password',
			name: 'newPassword',
			type: 'password',
			required: true,
			pattern: '^(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
			errorMessage:
				'Password should be at least 8 characters and include at least 1 letter, 1 number!',

			value: values.new,
			onChange: e =>
				setValues({ ...values, new: e.target.value }),
		},
		{
			label: 'Confirm password',
			name: 'confirmPassword',
			type: 'password',
			required: true,
			value: values.confirm,
			pattern: values.new,
			errorMessage: "Password don' match!",
			onChange: e =>
				setValues({ ...values, confirm: e.target.value }),
		},
	]

	const handleSubmit = () => {
		if (values.old === values.new) {
			toast.error('New password is already in use', {
				position: 'bottom-left',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			})
		} else {
			dispatch(
				login({ email: myInfo.email, password: values.old }),
			).then(res => {
				if (res.payload.response?.data === 'Wrong password') {
					toast.error('Old password is incorrect!', {
						position: 'bottom-left',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
				} else {
					userAPI
						.updateAccount({
							_id: userId,
							password: values.new,
						})
						.then(res => {
							if (res.status === 200) {
                                navigate('/')
								toast.success(
									'Password is updated successfully',
									{
										position: 'bottom-left',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
										theme: 'dark',
									},
								)
							}
						})
				}
			})
		}
	}

	return (
		<div className={styles.container}>
			{inputs.map(input => (
				<InputBasic key={input.label} {...input} fullWidth />
			))}
			<div>
				<ButtonBasic
					theme="thin"
					text="Change"
					color="green"
					disabled={
						!values.confirm ||
						!values.old ||
						!values.new ||
						values.confirm !== values.new
					}
					handleClick={handleSubmit}
				/>
			</div>
		</div>
	)
}
