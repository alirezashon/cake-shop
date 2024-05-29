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
		type: useRef<HTMLInputElement>(null),
		size: useRef<HTMLInputElement>(null),
		color: useRef<HTMLInputElement>(null),
		quantity: useRef<HTMLInputElement>(null),
		description: useRef<HTMLTextAreaElement>(null),
		keywords: useRef<HTMLInputElement>(null),
	}
	const [mainImage, setMainImage] = useState<string | null>()
	const [images, setImages] = useState<string[]>([])
	const [colors, setColors] = useState<string[]>([])

	const setBG = (type: string) => {
		const imageFiles =
			type === 'src'
				? refs.src.current instanceof HTMLInputElement && refs.src.current.files
					? refs.src.current.files
					: null
				: refs.subImages.current instanceof HTMLInputElement &&
				  refs.subImages.current.files
				? refs.subImages.current.files
				: null

		// Check if files are selected
		if (imageFiles && imageFiles.length > 0) {
			Array.from(imageFiles).forEach((file) => {
				const reader = new FileReader()
				reader.onloadend = () => {
					const imageData = reader.result?.toString().split(',')[1]
					if (type === 'src') {
						imageData && setMainImage(imageData)
					} else if (type === 'subImages') {
						imageData && setImages((prevImages) => [...prevImages, imageData])
					}
				}
				reader.readAsDataURL(file)
			})
		}
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
								: refName === 'color'
								? colors
								: ['price', 'quantity'].includes(refName)
								? parseInt(`${refs[refName].current?.value}`)
								: refName === 'keywords'
								? [refs[refName].current?.value]
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
			console.log('data', dataToSend)
			if (data.success) {
				toast.success('موفق')
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
			<div className={styles.header}>ایجاد پست جدید</div>
			{images.length > 0 && (
				<div className={styles.imageBoxHead}>sub images</div>
			)}
			<div className={styles.subImagesBox}>
				{images.map((image, index) => (
					<>
						<div
							key={index}
							onClick={() =>
								setImages((prev) =>
									prev.filter((img, findIndex) => index !== findIndex)
								)
							}>
							<Image
								className={styles.subImage}
								width={55}
								height={55}
								src={`data:image/jpeg;base64,${image}`}
								alt={`Sub Image ${index}`}
							/>
						</div>
					</>
				))}
			</div>
			{mainImage && (
				<>
					<div className={styles.imageBoxHead}>main image</div>
					<div onClick={() => setMainImage(null)}>
						<Image
							width={55}
							height={55}
							src={`data:image/jpeg;base64,${mainImage}`}
							alt={`main Image`}
							className={styles.subImage}
						/>
					</div>
				</>
			)}
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
						{refName === 'color' && colors.length > 0 && (
							<div className={styles.colorBox}>
								{colors.map((color, index) => (
									<div
										onClick={(e) =>
											setColors((prev) => prev.filter((item) => item !== color))
										}
										key={index}
										style={{ backgroundColor: `${color}` }}
										className={styles.color}></div>
								))}
							</div>
						)}
						<label>{refName}</label>
						{refName !== 'description' ? (
							<input
								ref={refs[refName] as RefObject<HTMLInputElement>}
								placeholder={refName}
								multiple={refName === 'subImages' && true}
								type={
									refName === 'src' || refName === 'subImages'
										? 'file'
										: refName === 'color'
										? 'color'
										: 'text'
								}
								onChange={(e) =>
									refName === 'color'
										? setColors((prev) => [...prev, e.target.value])
										: ['src', 'subImages'].includes(refName) &&
										  setBG(`${refName}`)
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
				<button
					type='submit'
					className={styles.submit}>
					ایجاد
				</button>
			</form>
		</>
	)
}

export default Admin
