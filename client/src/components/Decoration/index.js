import styles from './index.module.scss'

export default function Decoration({ blobs }) {
	return (
		<>
			{blobs.map((blob, index) => (
				<img
					key={blob}
					src={blob}
					alt=""
					className={styles[`blob-${index}`]}
				/>
			))}
		</>
	)
}
