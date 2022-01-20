import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import { ButtonBasic, InputBasic } from 'components/UI'
import styles from './index.module.scss'
import { register } from 'data/slices/authSlice'

export default function RegisterForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [isLoading, setIsLoading] = useState({
		register: false,
		google: false,
		github: false,
	})

	const inputs = [
		{
			id: 1,
			name: 'username',
			type: 'text',
			label: 'Username',
			placeholder: 'Enter your username...',
			pattern: '^[a-zA-Z0-9]{4,16}$',
			errorMessage:
				"Username should be 4-16 characters and shouldn' include any special character!",
		},
		{
			id: 2,
			name: 'email',
			type: 'email',
			label: 'Email',
			placeholder: 'Enter your email...',
			errorMessage:
				"Username should be 4-16 characters and shouldn' include any special character!",
		},
		{
			id: 3,
			name: 'password',
			type: 'password',
			label: 'Password',
			placeholder: 'Enter your password...',
			pattern: '^(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
			errorMessage:
				'Password should be at least 8 characters and include at least 1 letter, 1 number!',
		},
		{
			id: 4,
			name: 'confirmPassword',
			type: 'password',
			label: 'Confirm password',
			placeholder: 'Confirm your password...',
			pattern: values.password,
			errorMessage: "Password don' match!",
		},
	]

	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleSubmitButton = async e => {
		try {
			const body = {
				username: values.username,
				email: values.email,
				password: values.password,
			}
			setIsLoading({ ...isLoading, register: true })
			dispatch(register(body)).then(res => {
			
				if (res.payload.response?.data === 'duplicate') {
					setIsLoading({ ...isLoading, register: false })
					toast.error(
						'Your username or email already exists',
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
				if (res.type === 'user/register/fulfilled') {
					setIsLoading({ ...isLoading, register: false })
					navigate('/login')
					toast.success('Sign up succesful!', {
						position: 'bottom-left',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'dark',
					})
				}
			})
		} catch (error) {
			setIsLoading({ ...isLoading, register: false })
			 (error)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.inputGroupHorizontal}>
				{inputs.map(
					(input, index) =>
						index <= 1 && (
							<InputBasic
								key={input.id}
								{...input}
								onChange={handleChange}
								value={values[input.name]}
							/>
						),
				)}
			</div>
			{inputs.map(
				(input, index) =>
					index >= 2 && (
						<InputBasic
							key={input.id}
							{...input}
							onChange={handleChange}
							value={values[input.name]}
						/>
					),
			)}
			<div className={styles.py}>
				<ButtonBasic
					text="Sign up"
					fullWidth
					theme="thin"
					color="green"
					handleClick={handleSubmitButton}
					disabled={
						values.password !== values.confirmPassword ||
						!values.email ||
						!values.password ||
						!values.username
					}
					isLoading={isLoading.register}
				/>
			</div>
			<div className={styles.dividerContainer}>
				<span className={styles.divider}></span>
				<span>Or</span>
				<span className={styles.divider}></span>
			</div>
			<div className={styles.signInWith}>
				<ButtonBasic text="Google" theme="fat" color="red" />
				<ButtonBasic text="Github" theme="fat" color="gray" />
			</div>
			<div>
				<span className={styles.toSignUp}>
					You already have a account?{' '}
					<Link to="/login">Sign in now</Link>
				</span>
			</div>
		</div>
	)
}
