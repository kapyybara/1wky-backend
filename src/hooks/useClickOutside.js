import { useEffect } from 'react'

export default function useClickOutside(ref, func, otherRef) {
	useEffect(() => {
		const handleClickOutside = e => {
			if (
				otherRef.current &&
				!otherRef.current.contains(e.target)
			)
				if (ref.current && !ref.current.contains(e.target)) {
					func()
				}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener(
				'mousedown',
				handleClickOutside,
			)
		}
	}, [func, ref])
}
