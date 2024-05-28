/** @format */

import Image from 'next/image'
import React, { useState, useRef, RefObject } from 'react'
import styles from './index.module.css'
import Search from '../../Form/Search'
import { MdAddCircle, MdEditDocument } from 'react-icons/md'
import { GiSplitCross } from 'react-icons/gi'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import Admin from '../Inserto'
interface Post {
	_id: string
	title: string
	src: string
	subImages: string[]
	price: number
	categories: string[]
	type: string
	size: string
	color: string[]
	quantity: number
	description: string
	keywords: string[]
}
interface Props {
	data: Post[]
	isLoading: boolean
}
const PostAdmin: React.FC<Props> = ({ data, isLoading }) => {
	const refs: {
		[key: string]: RefObject<HTMLInputElement>
	} = {
		src: useRef<HTMLInputElement>(null),
		subImages: useRef<HTMLInputElement>(null),
	}

	const [openActions, setOpenAction] = useState<number>(-1)
	const [formData, setFormData] = useState<Post | null>(null)
	const [mainImage, setMainImage] = useState<string | null>()
	const [images, setImages] = useState<string[]>([])
	const [addis, setAddis] = useState<boolean>(false)
	const handleActionClick = (index: number) => {
		setOpenAction(index)
		setFormData(data[index])
	}
	const handleChange = (key: string, value: string | number | string[]) => {
		if (formData) {
			setFormData({ ...formData, [key]: value })
		}
	}

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
						formData && setFormData({ ...formData, src: `${imageData}` })
					} else if (type === 'subImages') {
						imageData && setImages((prevImages) => [...prevImages, imageData])
					}
				}
				reader.readAsDataURL(file)
			})
		}
	}
	const kamToDB = async (action: string) => {
		try {
			const dataToSend = {
				authType: '^A*d&m%i$NB#I$N@s*e&R%t!',
				data: formData,
				action: `${action}`,
			}

			const response = await fetch(
				`/api/data/Post/Admin?aydi=${formData?._id}`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToSend),
				}
			)
			if (formData) {
				const data = await response.json()
				console.log(response.status, 'data', dataToSend)
				if (data.success) {
					toast.success('ریختش خوبه')
				} else {
					toast.error('اوه اوه')
				}
			} else {
				toast.error('الان تغییری احساس میکنی به نظرت ؟')
			}
		} catch (error) {
			console.error('Error:', error)
			toast.error('An error occurred. Please try again later.')
		}
	}

	return (
		<>
			{addis && (
				<div className={styles.insertox}>
					<GiSplitCross className={styles.cross} onClick={()=>setAddis(false)}/>
					<Admin />
				</div>
			)}
			<div className={styles.header}>
				{isLoading ? 'درحال بارگیری' : 'لیست پست های موجود'}
			</div>
			<div className={styles.container}>
				<div className={styles.actionBox}>
					<div className={styles.searchBox}>
						<Search />
					</div>
					<MdAddCircle
						onClick={()=>setAddis(true)}
						className={styles.add}
						size={'6vh'}
					/>
				</div>
				<div className={styles.tableContainer}>
					<table>
						<thead>
							<tr>
								{['title', 'src', 'color', 'price'].map((post) => (
									<th key={post}>{post}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{!isLoading
								? data.map((post, index) => (
										<tr key={post._id}>
											<td>{post.title}</td>
											<td>
												<Image
													className={styles.tableImage}
													src={`data:image/jpeg;base64,${post.src}`}
													alt={`${post.title}`}
													width={77}
													height={77}
												/>
											</td>
											<td>
												{post.color.map((color, index) => (
													<div
														key={index}
														className={styles.colorBox}
														style={{ backgroundColor: `${color}` }}></div>
												))}
											</td>
											<td>{post.price}</td>
											{
												<MdEditDocument
													className={styles.actionButton}
													onClick={() => handleActionClick(index)}
												/>
											}
										</tr>
								  ))
								: Array.apply(0, Array(7)).map((x, r) => (
										<tr
											key={r}
											className={styles.loading}>
											{Array.apply(0, Array(4)).map((x, d) => (
												<td key={d}></td>
											))}
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
			</div>
			{openActions !== -1 && (
				<div className={styles.actionContainer}>
					<GiSplitCross
						className={styles.cross}
						onClick={() => setOpenAction(-1)}
					/>
					{images.length > 0 && (
						<div className={styles.imageBoxHead}>sub images</div>
					)}
					{images.length > 0 && (
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
					)}
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
					<form>
						{formData && (
							<>
								{Object.keys(refs).map((refName, index) => (
									<div
										key={index}
										className={styles.productBoxRow}>
										<label className={styles.customFileUpload}>
											<input
												ref={refs[refName] as RefObject<HTMLInputElement>}
												placeholder={refName}
												multiple={refName === 'subImages' && true}
												type={'file'}
												onChange={() => setBG(`${refName}`)}
											/>
											{`${refName}`}
										</label>
									</div>
								))}

								<input
									onChange={(e) => handleChange('title', e.target.value)}
									className={styles.editModeRow}
									value={formData.title}
								/>
								<input
									onChange={(e) =>
										handleChange('price', parseInt(e.target.value))
									}
									className={styles.editModeRow}
									value={formData.price}
								/>
								<div className={styles.editModeRow}>
									{formData.categories.map((category, index) => (
										<input
											key={index}
											onChange={(e) => {
												const updatedCategories = [...formData.categories]
												updatedCategories[index] = e.target.value
												handleChange('categories', updatedCategories)
											}}
											value={category}
										/>
									))}
								</div>
								<input
									onChange={(e) => handleChange('brand', e.target.value)}
									className={styles.editModeRow}
									value={formData.type}
								/>
								<input
									onChange={(e) => handleChange('size', e.target.value)}
									className={styles.editModeRow}
									value={formData.size}
								/>
								<input
									onChange={(e) =>
										handleChange('quantity', parseInt(e.target.value))
									}
									className={styles.editModeRow}
									value={formData.quantity}
								/>
								<div className={styles.editModeRow}>
									{formData.keywords.map((keyword, index) => (
										<input
											key={index}
											onChange={(e) => {
												const updatedKeywords = [...formData.keywords]
												updatedKeywords[index] = e.target.value
												handleChange('keywords', updatedKeywords)
											}}
											value={keyword}
										/>
									))}
								</div>
							</>
						)}
					</form>
					<div className={styles.buttonBox}>
						<div
							onClick={() => kamToDB('*U)p(d&a^t%e^O&n@e%A^d&M^i*n(')}
							className={styles.update}>
							update
						</div>
						<div
							onClick={() => kamToDB('d)e*L(e&T^e*O&n^e$o%f@')}
							className={styles.delete}>
							Delete
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default PostAdmin
