import { IconWrapper } from 'components/UI'
import styles from './index.module.scss'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as Muted } from 'assets/icons/muted.svg'
import { ReactComponent as UnMuted } from 'assets/icons/unmuted.svg'
import { ReactComponent as OnCam } from 'assets/icons/onCam.svg'
import { ReactComponent as OffCam } from 'assets/icons/offCam.svg'
import { ReactComponent as OffPhone } from 'assets/icons/offphone.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Controller({ setPosition, stream, leaveCall, id }) {
	const navigate = useNavigate()
	const handleChangeGrid = () => {
		setPosition(prev => (prev <= 2 ? prev + 1 : 1))
	}
	const [onCam, setOnCam] = useState(true)
	const [onMic, setOnMic] = useState(true)

	const handleMuteMic = () => {
		if (stream) {
			setOnMic(!stream?.getAudioTracks()[0].enabled)
			stream.getAudioTracks()[0].enabled =
				!stream.getAudioTracks()[0].enabled
		}
	}
	const handleMuteVideo = () => {
		if (stream) {
			setOnCam(!stream?.getVideoTracks()[0].enabled)
			stream.getVideoTracks()[0].enabled =
				!stream.getVideoTracks()[0].enabled
		}
	}

	const handleOffPhone = () => {
		navigate('/')
		leaveCall(id)
	}

	return (
		<div className={styles.container}>
			<span onClick={handleChangeGrid}>
				<IconWrapper icon={<GridIcon />} />
			</span>
			<span onClick={handleMuteMic}>
				<IconWrapper icon={onMic ? <Muted /> : <UnMuted />} />
			</span>
			<span onClick={handleMuteVideo}>
				<IconWrapper icon={onCam ? <OffCam /> : <OnCam />} />
			</span>
			<span onClick={handleOffPhone}>
				<IconWrapper icon={<OffPhone />} />
			</span>
		</div>
	)
}

export default Controller
