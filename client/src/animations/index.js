import { motion } from 'framer-motion'

const xTransition = {
	in: {
		opacity: 1,
		x: 0,
		paddingBottom: '1rem',
		zIndex: 99,
	},
	out: {
		opacity: 0,
		x: '-100%',
		zIndex: 99,
		paddingBottom: '1rem',
	},
}

const fade = {
	in: {
		opacity: 1,
	},
	out: {
		opacity: 0,
	},
}

const backdropFade = {
	in: {
		opacity: 1,
		zIndex: 99,
	},
	out: {
		opacity: 0,
		zIndex: 99,
	},
}

export function XTransition({ children }) {
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={xTransition}
		>
			{children}
		</motion.div>
	)
}

export function Fade({ children }) {
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={fade}
		>
			{children}
		</motion.div>
	)
}

export function BackdropFade({ children }) {
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={backdropFade}
		>
			{children}
		</motion.div>
	)
}
