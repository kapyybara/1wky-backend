import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './index.module.scss'
import socket, { SocketContext } from 'service/SocketContext'
import Controller from '../Meetting/Controller'
import clsx from 'clsx'
import { toast } from 'react-toastify'

const MeettingAnswer = () => {
	const {
		myVideo,
		callAccepted,
		userVideo,
		callEnded,
		stream,
		setStream,
		leaveCall,
		answerCall,
		setCallEnded,
		connectionRef,
	} = useContext(SocketContext)
	const navigative = useNavigate()
	const [position, setPosition] = useState(1)
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then(currentStream => {
				setStream(currentStream)
				myVideo.current.srcObject = currentStream
				answerCall(currentStream)
			})
	}, [])

	useEffect(() => {
		if (callEnded) {
			toast.warn('Call have been ended!', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			const timerid = setTimeout(() => {
				navigative('/')
				window.location.reload()
			},3000)
			return () => clearTimeout(timerid)
		}
	}, [callEnded])

	return (
		<div
			className={clsx(
				styles.container,
				styles[`container_${position}`],
			)}
		>
			{callAccepted && !callEnded && (
				<video
					ref={userVideo}
					playsInline
					autoPlay
					className={clsx(
						styles.userVideo,
						styles[`userVideo_${position}`],
					)}
					draggable={true}
				/>
			)}
			{stream && (
				<video
					ref={myVideo}
					playsInline
					muted
					autoPlay
					className={clsx(
						styles.myVideo,
						styles[`myVideo_${position}`],
					)}
				/>
			)}
			<Controller
				setPosition={setPosition}
				stream={stream}
				leaveCall={leaveCall}
			/>
		</div>
	)
}

export default MeettingAnswer
