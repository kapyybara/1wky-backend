import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

import { ButtonBasic, InputBasic, Divider } from 'components/UI'
import styles from './index.module.scss'
import { login } from 'data/slices/authSlice'

export default function LoginForm() {
	const [values, setValues] = useState({
		email: '',
		password: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const inputs = [
		{
			id: 1,
			name: 'email',
			label: 'Email',
			placeholder: 'Enter your email...',
			errorMessage: 'Email is wrong!! please try again!',
		},
		{
			id: 2,
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Enter your password...',
			errorMessage: 'Password is wrong!! please try again!',
		},
	]

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleSubmitButton = async e => {
		const body = {
			email: values.email,
			password: values.password.trim(),
		}
		setIsLoading(true)
		dispatch(login(body)).then(res => {
			switch (res.payload.response?.data) {
				case 'Wrong password': {
					toast.error('Wrong password !', {
						position: 'bottom-left',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
					setIsLoading(false)
					break
				}
				case 'User not found': {
					toast.error('Gmail not found!', {
						position: 'bottom-left',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
					setIsLoading(false)
					break
				}
				default: {
					if (res?.type === 'user/login/fulfilled') {
						setIsLoading(false)
						navigate('/')
						toast.success('Login succesful!', {
							position: 'bottom-left',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'dark',
						})
					} else {
						setIsLoading(false)
						toast.error('Something wrong!', {
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
			}
		})
	}

	return (
		<div className={styles.container}>
			{inputs.map(input => (
				<InputBasic
					key={input.id}
					{...input}
					onChange={handleChange}
					value={values[input.name]}
				/>
			))}
			<div className={styles.py}>
				<ButtonBasic
					text="Sign in"
					fullWidth
					theme="thin"
					color="green"
					disabled={
						values.email === '' || values.password === ''
					}
					handleClick={handleSubmitButton}
					isLoading={isLoading}
				/>
			</div>
			<Divider text="Or" />
			<div className={styles.signInWith}>
				<ButtonBasic
					handleClick={() => {}}
					text="Google"
					theme="fat"
					color="red"
				/>
				<ButtonBasic text="Github" theme="fat" color="gray" />
			</div>
			<div>
				<span className={styles.toSignUp}>
					You aren’t a menber?{' '}
					<Link to="/register">Sign up now</Link>
				</span>
			</div>
		</div>
	)
}
