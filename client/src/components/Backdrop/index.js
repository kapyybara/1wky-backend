import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react'
import { zoomImage } from 'data/slices/postSlice'
import { SocketContext } from 'service/SocketContext'
import { useNavigate } from 'react-router-dom'

export default function Backdrop({ children }) {
	const navigative = useNavigate()
	const dispatch = useDispatch()
	const { call, answerCall, callAccepted } =
		useContext(SocketContext)
	const { backdrop, popup } = useSelector(state => state.backdrop)
	const { imageZooming, isZoom } = useSelector(state => state.post)
	const handleAnswer = () => {
		navigative('/anwser/meetting')
	}

	return (
		<>
			{isZoom && (
				<div
					className={styles.backdrop}
					onClick={() =>
						dispatch(
							zoomImage({ url: '', isZoom: false }),
						)
					}
				>
					<img
						src={imageZooming}
						className={styles.backdropImg}
						alt=""
					/>
				</div>
			)}
			{call.isReceivedCall && !callAccepted && (
				<div className={styles.backdrop}>
					<h1>Have a call</h1>
					<button onClick={handleAnswer}>Answer</button>
				</div>
			)}
			{backdrop && popup && (
				<div
					className={styles.backdrop}
					onClick={() =>
						dispatch(
							zoomImage({ url: '', isZoom: false }),
						)
					}
				>
					{backdrop}
				</div>
			)}
		</>
	)
}
