/** @format */

import { useRef, RefObject, useState } from 'react'
import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import Image from 'next/image'

const Admin: React.FC = () => {
	const refs: {
		[key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
	} = {
		title: useRef<HTMLInputElement>(null),
		src: useRef<HTMLInputElement>(null),
		subImages: useRef<HTMLInputElement>(null),
		price: useRef<HTMLInputElement>(null),
		categories: useRef<HTMLInputElement>(null),
		brand: useRef<HTMLInputElement>(null),
		quantity: useRef<HTMLInputElement>(null),
		description: useRef<HTMLTextAreaElement>(null),
		keywords: useRef<HTMLInputElement>(null),
	}
	const [mainImage, setMainImage] = useState<string>()
	const [images, setImages] = useState<string[]>([])

	const setBG = (type: string) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			const imageData = reader.result?.toString().split(',')[1]
			if (type === 'src') {
				setMainImage(imageData)
			} else if (type === 'subImages') {
				imageData &&
					setImages((prevImages: string[]) => [...prevImages, imageData])
			}
		}

		const imageFile =
			type === 'src'
				? refs.src.current instanceof HTMLInputElement && refs.src.current.files
					? refs.src.current.files[0]
					: null
				: refs.subImages.current instanceof HTMLInputElement &&
				  refs.subImages.current.files
				? refs.subImages.current.files[0]
				: null
		imageFile && reader.readAsDataURL(imageFile)
	}

	const inserToDB = async () => {
		try {
			const dataToSend = {
				authType: '^A*d&m%i$NB#I$N@s*e&R%t!',
				data: Object.keys(refs)
					.map((refName) => ({
						[refName]:
							refName === 'src'
								? mainImage
								: refName === 'subImages'
								? images
								: refs[refName].current?.value,
					}))
					.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
				action: '(*I&n%s$E#r@t^O&n*E(',
			}

			const response = await fetch('/api/data/Post/Admin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			})

			const data = await response.json()
			console.log(data)
			if (data.success) {
				toast.success('ریختش خوبه')
			} else {
				toast.error('اوه اوه')
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('An error occurred. Please try again later.')
		}
	}

	return (
		<>
			{images}

			<ToastContainer
				position={'top-right'}
				newestOnTop
				pauseOnHover
				style={{
					transform: 'rotate(-7deg)',
					margin: '2vh',
				}}
				transition={Zoom}
			/>
			{images.map((image, index) => (
				<div key={index}>
					<Image
						width={99}
						height={99}
						src={image}
						alt={`Sub Image ${index}`}
						style={{ maxWidth: '100px', maxHeight: '100px' }}
					/>
					<p>{image}</p>
				</div>
			))}
			<form
				className={styles.productBox}
				onSubmit={(e) => {
					e.preventDefault()
					inserToDB()
				}}>
				{Object.keys(refs).map((refName, index) => (
					<div
						key={index}
						className={styles.productBoxRow}>
						<label>{refName}</label>
						{refName !== 'description' ? (
							<input
								ref={refs[refName] as RefObject<HTMLInputElement>}
								placeholder={refName}
								multiple={refName === 'subImages' && true}
								type={
									refName === 'src' || refName === 'subImages' ? 'file' : 'text'
								}
								onChange={() =>
									refName === 'src' ||
									(refName === 'subImages' && setBG(refName))
								}
							/>
						) : (
							<textarea
								placeholder='توضیحات . . . '
								ref={
									refs[refName] as RefObject<HTMLTextAreaElement>
								}></textarea>
						)}
					</div>
				))}
				<button type='submit'>بریز توش</button>
			</form>
		</>
	)
}

export default Admin
