import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from '@firebase/storage'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import { DropItem, IconWrapper, ImageText } from 'components/UI'
import Appbar from './Appbar'
import styles from './index.module.scss'
import { ReactComponent as Plus } from 'assets/icons/plus.svg'
import { ReactComponent as Image } from 'assets/icons/image.svg'
import { ReactComponent as Send } from 'assets/icons/send.svg'
import { ReactComponent as LoadingInfi } from 'assets/icons/loading.svg'
import { storage } from 'data/firebase'
import { addPost, getTimeLine } from 'data/slices/postSlice'

export default function AddPost() {
	const dispatch = useDispatch()

	const [open, setOpen] = useState(true)
	const [value, setValue] = useState('')
	const [image, setImage] = useState()
	const [uploadProgress, setUploadProgress] = useState(0)

	const { username, avatar, _id } = useSelector(
		state => state.user.myInfo,
	)

	const inputRef = useRef()

	const handleInputChange = e => {
		setValue(e.target.value)
	}

	const handlePreviewImage = e => {
		const file = e.target.files[0]
		file.preview = URL.createObjectURL(file)
		setOpen(true)
		setImage(file)
	}

	const handleUploadImage = async file => {
		const storageRef = ref(
			storage,
			`/iwVy/${username}${file?.name}`,
		)
		const uploadTask = uploadBytesResumable(storageRef, file)
		toast.promise(
			uploadTask,
			{
				pending: `Uploading image`,
				error: 'Uploading image failed. Please check your network and try again!',
				success: 'Uploading image successful!',
			},
			{
				position: 'bottom-left',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			},
		)

		uploadTask.on(
			'state_changed',
			snapshot => {
				const prog = Math.round(
					(snapshot.bytesTransferred /
						snapshot.totalBytes) *
						100,
				)
				setUploadProgress(prog)
			},
			err => {
				console.log(err)
			},
		)
		return uploadTask.then(value => {
			return getDownloadURL(value.metadata.ref)
		})
	}

	const handleAddPost = () => {
		if (!value) {
			toast.error('Post have not been empty', {
				position: 'bottom-left',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			})
		} else {
			if (image)
				handleUploadImage(image).then(url => {
					setImage({ ...image, onlineUrl: url })
					dispatch(
						addPost({
							userId: _id,
							content: value,
							img: url,
						}),
					).then(() => {
						dispatch(getTimeLine({ userId: _id }))
						setImage(null)
						setValue('')
					})
				})
			else {
				dispatch(
					addPost({
						userId: _id,
						content: value,
						img: 'none image',
					}),
				).then(() => {
					setImage(null)
					setValue('')
					setImage(null)
					setValue('')
				})
			}
		}
	}

	useEffect(() => {
		// inputRef.current && inputRef.current.focus()
		return () => {
			image && URL.revokeObjectURL(image.preview)
		}
	}, [image])

	return (
		<div className={styles.container}>
			<Appbar
				avatar="https://i.pinimg.com/originals/1a/e7/53/1ae75336c051202a09eb2c841c588a20.gif"
				username="Tien  "
			>
				<ImageText
					type="avatar"
					image={avatar || ''}
					text={username || ''}
				/>
				<div className={styles.groupIcon}>
					<IconWrapper
						icon={<Plus />}
						handleClick={() => setOpen(!open)}
						dark
					/>
				</div>
			</Appbar>
			{open && (
				<textarea
					className={styles.textarea}
					value={value}
					onChange={handleInputChange}
					rows={2}
					ref={inputRef}
				/>
			)}
			{image && (
				<img
					src={image.preview}
					className={styles.preview}
					alt=""
				/>
			)}
			{open && (
				<div className={styles.buttonGroup}>
					{uploadProgress !== 0 && (
						<span
							className={clsx(styles.icon, {
								[styles.o0]: uploadProgress === 100,
							})}
						>
							<DropItem
								icon={<LoadingInfi />}
								text={`${uploadProgress}%`}
								handleClick={() => {}}
								pointer
							/>
						</span>
					)}
					<span className={styles.icon}>
						<label htmlFor="imageInput">
							<DropItem
								icon={<Image />}
								text="Image"
								pointer
							/>
						</label>
					</span>
					<span className={styles.icon}>
						<DropItem
							icon={<Send />}
							text={'Pulish'}
							handleClick={handleAddPost}
							pointer
						/>
					</span>
				</div>
			)}
			<input
				type="file"
				name="imageInput"
				id="imageInput"
				className={styles.dn}
				onChange={handlePreviewImage}
				accept=".png,.gif,.jpeg,.jpg"
			/>
		</div>
	)
}
