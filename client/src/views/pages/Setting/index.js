import { useSelector } from 'react-redux'

import styles from './index.module.scss'
import { ReactComponent as Camera } from 'assets/icons/camera.svg'
import { ButtonBasic, InputBasic } from 'components/UI'
import { useEffect, useState } from 'react'
import { userAPI } from 'apis/userAPI'
import defaultAvatar from 'assets/images/circle.png'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Setting() {
	const navigate = useNavigate()
	const userId = localStorage.getItem('userId')
	const [values, setValues] = useState({
		username: '',
		email: '',
		city: '',
		description: '',
	})

	useEffect(() => {
		const mounted = true
		const getUsers = async () => {
			const res = await userAPI.getById(userId)
			setValues(res?.data.data)
		}
		mounted && getUsers()
	}, [])

	console.log('render')

	const handleUpdate = async () => {
		await userAPI.updateAccount(values).then(res => {
			if (res.status === 200) {
				toast.success('Update succesful!', {
					position: 'bottom-left',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				})
				navigate('/')
			} else {
				toast.error('Update error!', {
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
		})
	}
	const inputs = [
		{
			name: 'username',
			type: 'text',
			label: 'Username',
			placeholder: 'Enter your username...',
			pattern: '^[a-zA-Z0-9]{4,16}$',
			value: values.username,
			errorMessage:
				"Username should be 4-16 characters and shouldn' include any special character!",
		},
		{
			name: 'email',
			type: 'email',
			label: 'Email',
			value: values.email,
			placeholder: 'Enter your email...',
			errorMessage:
				"Username should be 4-16 characters and shouldn' include any special character!",
		},
		{
			name: 'city',
			type: 'text',
			label: 'City',
			value: values.city,
			placeholder: 'Enter your city...',
		},
	]

	const handleChangePassword = () => {
		navigate('/changepass')
	}

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<span className={styles.avatar}>
					<img
						src={values.avatar || defaultAvatar}
						alt=""
					/>
					<span className={styles.changeAvatar}>
						<Camera />
					</span>
				</span>
			</div>
			<div className={styles.right}>
				<InputBasic
					{...inputs[0]}
					onChange={e =>
						setValues({
							...values,
							[inputs[0].name]: e.target.value,
						})
					}
				/>
				<InputBasic
					{...inputs[1]}
					onChange={e =>
						setValues({
							...values,
							[[inputs[1].name]]: e.target.value,
						})
					}
				/>
			</div>
			<div className={styles.bottom}>
				<InputBasic
					{...inputs[2]}
					onChange={e =>
						setValues({
							...values,
							[[inputs[2].name]]: e.target.value,
						})
					}
				/>
				<div className={styles.input}>
					<label htmlFor="desciption">Desciption</label>
					<textarea
						id="desciption"
						value={values.description}
						className={styles.textarea}
						onChange={e =>
							setValues({
								...values,
								description: e.target.value,
							})
						}
						rows={3}
					/>
				</div>
			</div>
			<div className={styles.buttonContainer}>
				<ButtonBasic
					text="Change password"
					theme="thin"
					color="green"
					handleClick={handleChangePassword}
				/>
				<ButtonBasic
					text="Update infomation"
					theme="thin"
					color="green"
					handleClick={handleUpdate}
				/>
			</div>
		</div>
	)
}
