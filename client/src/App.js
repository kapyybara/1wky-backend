import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Layout from './views/layouts'
import routes from './routes'
import Backdrop from 'components/Backdrop'
import { getMe } from 'data/slices/userSlice'
import { getTimeLine, setLoading } from 'data/slices/postSlice'
import Suspense from 'views/pages/Suspense'

export default function App() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userId = localStorage.getItem('userId')

	const isHasLayout = [
		'/',
		'/user/:id',
		'/savedposts',
		'/setting',
		'/changepass',
	]

	const RouteContainer = routes => {
		let result = []
		if (routes.length > 0) {
			result = routes.map((route, index) => {
				switch (route.path) {
					case '/meetting/:id':
						return (
							<Route
								key={index}
								path={route.path}
								element={route.main}
							/>
						)
					case '/anwser/meetting':
						return (
							<Route
								key={index}
								path={route.path}
								element={route.main}
							/>
						)
					case '/chat':
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<Layout type="large">
										{route.main}
									</Layout>
								}
							/>
						)

					default:
						return (
							<Route
								key={index}
								path={route.path}
								element={
									isHasLayout.includes(
										route.path,
									) ? (
										<Layout side type="large">
											{route.main}
										</Layout>
									) : (
										<Layout type="medium">
											{route.main}
										</Layout>
									)
								}
							/>
						)
				}
			})
		}
		return result
	}

	useEffect(() => {
		const userId = localStorage.getItem('userId')
		if (!userId) {
			navigate('/login')
		} else {
			dispatch(setLoading(true))
			dispatch(
				getTimeLine({
					userId,
					params: { page: 1, limit: 5 },
				}),
			)
			dispatch(getMe({ userId }))
		}
	}, [userId])
	return (
		<div>
			<AnimatePresence>
				<Suspense />
				{/* <Routes>{RouteContainer(routes)}</Routes> */}
				<Backdrop key="backdrop" />
			</AnimatePresence>
		</div>
	)
}
