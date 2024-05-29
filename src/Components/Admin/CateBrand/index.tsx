/** @format */

import { useRef, RefObject, useState } from 'react'
import styles from './index.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import List from './List'
 const Admin: React.FC = () => {
	const refs: {
		[key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
	} = {
		name: useRef<HTMLInputElement>(null),
		en: useRef<HTMLInputElement>(null),
		src: useRef<HTMLInputElement>(null),
		description: useRef<HTMLTextAreaElement>(null),
		keywords: useRef<HTMLInputElement>(null),
	}
	const [image, setImage] = useState<string>()
	const [authType, setAuthType] = useState<string>('^c(a)t*E(g&o*x^z&i#m!')
	const setFile = () => {
		const reader = new FileReader()
		reader.onloadend = () => {
			const imageData = reader.result?.toString().split(',')[1]
			setImage(imageData)
		}
		const imageFile =
			refs.src.current instanceof HTMLInputElement && refs.src.current.files
				? refs.src.current.files[0]
				: null
		imageFile && reader.readAsDataURL(imageFile)
	}
	const inserToDB = async () => {
		try {
			const dataToSend = {
				authType,
				data: Object.keys(refs)
					.map((refName) => ({
						[refName]: refName !== 'src' ? refs[refName].current?.value : image,
					}))
					.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
				action: '(*I&n()s*e(r&t*^%t^O&n*E(',
			}

			const response = await fetch('/api/data/Post/Admin/CateBrand', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			})

			const data = await response.json()
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
			<List />
			<div className={styles.header}>ایجادو تغییر برند یا کتگوری </div>
			<select
				className={styles.selectList}
				onChange={(e) => setAuthType(e.target.value)}
				value={authType}>
				<option value='^c(a)t*E(g&o*x^z&i#m!'>category</option>
				<option value='(b&r^i%a&N^d$i^s#e!k%)'>brand</option>
			</select>

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
								type={refName === 'src' ? 'file' : 'text'}
								onChange={() => refName === 'src' && setFile()}
							/>
						) : (
							<textarea
								placeholder='توضیحات . . . '
								ref={refs[refName] as RefObject<HTMLTextAreaElement>}
								onChange={() => setFile()}></textarea>
						)}
					</div>
				))}
				<button type='submit'>تایید</button>
			</form>
		</>
	)
}

export default Admin
