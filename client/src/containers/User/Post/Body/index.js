import { useDispatch } from 'react-redux'

import { zoomImage } from 'data/slices/postSlice'
import styles from './index.module.scss'

export default function Body({ content, img }) {
	const dispatch = useDispatch()

	const handleZoom = () => {
		dispatch(zoomImage({ url: img, isZoom: true }))
	}

	return (
		<div className={styles.container}>
			<p className={styles.content}>{content}</p>
			{img !== 'none image' && (
				<img
					src={img}
					alt=""
					className={styles.img}
					onClick={handleZoom}
				/>
			)}
		</div>
	)
}
