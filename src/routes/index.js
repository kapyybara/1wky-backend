import { lazy, Suspense } from 'react'
import SuspensePage from 'views/pages/SuspensePage'

const Chat = lazy(() => import('../views/pages/Chat'))
const Setting = lazy(() => import('../views/pages/Setting'))
const HomePage = lazy(() => import('../views/pages/Home'))
const Meetting = lazy(() => import('../views/pages/Meetting'))
const LoginPage = lazy(() => import('../views/pages/Login'))
const SavedPosts = lazy(() => import('views/pages/SavedPosts'))
const ChangePass = lazy(() => import('../views/pages/ChangePass'))
const RegisterPage = lazy(() => import('../views/pages/Register'))
const PersonalPage = lazy(() => import('views/pages/personalPage'))
const MeettingAnswer = lazy(() =>
	import('views/pages/MeettingAnwser'),
)

const routes = [
	{
		path: '/',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/login',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: '/register',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<RegisterPage />
			</Suspense>
		),
	},
	{
		path: '/user/:id',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<PersonalPage />
			</Suspense>
		),
	},
	{
		path: '/savedposts',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<SavedPosts />
			</Suspense>
		),
	},
	{
		path: '/setting',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<Setting />
			</Suspense>
		),
	},
	{
		path: '/changepass',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<ChangePass />
			</Suspense>
		),
	},
	{
		path: '/chat',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<Chat />
			</Suspense>
		),
	},
	{
		path: '/meetting/:id',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<Meetting />
			</Suspense>
		),
	},
	{
		path: '/anwser/meetting',
		main: (
			<Suspense fallback={<SuspensePage />}>
				<MeettingAnswer />
			</Suspense>
		),
	},
]

export default routes
