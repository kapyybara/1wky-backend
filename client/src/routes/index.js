import { lazy, Suspense } from 'react'

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
			<Suspense fallback={<h1>Loadding...</h1>}>
				<HomePage />
			</Suspense>
		),
	},
	{
		path: '/login',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<LoginPage />
			</Suspense>
		),
	},
	{
		path: '/register',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<RegisterPage />
			</Suspense>
		),
	},
	{
		path: '/user/:id',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<PersonalPage />
			</Suspense>
		),
	},
	{
		path: '/savedposts',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<SavedPosts />
			</Suspense>
		),
	},
	{
		path: '/setting',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<Setting />
			</Suspense>
		),
	},
	{
		path: '/changepass',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<ChangePass />
			</Suspense>
		),
	},
	{
		path: '/chat',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<Chat />
			</Suspense>
		),
	},
	{
		path: '/meetting/:id',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<Meetting />
			</Suspense>
		),
	},
	{
		path: '/anwser/meetting',
		main: (
			<Suspense fallback={<h1>Loadding...</h1>}>
				<MeettingAnswer />
			</Suspense>
		),
	},
]

export default routes
