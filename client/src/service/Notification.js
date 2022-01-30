const playSound = url => {
	const sound = new Audio(url)

	sound.play()

	return () => {
		sound.pause()
		sound.currentTime = 0
	}
}

export const tuturu = () => {
	return playSound('/sound/tuturu.mp3')
}
export const ringtone = () => {
	return playSound('/sound/ringtone.mp3')
}
