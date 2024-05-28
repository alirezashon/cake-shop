/** @format */

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { MdEditDocument } from 'react-icons/md'
import styles from './index.module.css' // Update with your CSS file path

interface Carousel {
	_id: string
	src: string
	alt: string
	keywords: [string]
}

const List: React.FC = () => {
	const [data, setData] = useState<{
		carousel: Carousel[]
	} | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/data/Post/Admin/Carousel/GET', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						authType: '^c(a)ta*sEa0c(ga&roo*uxs^ezl&i#A!',
					}),
				})

				if (response.ok) {
					const result = await response.json()
					setData(result)
					setIsLoading(false)
				} else {
					toast.error('خطا')
					setIsLoading(false)
				}
			} catch (error) {
				toast.error('خطا')
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<div className={styles.tableContainer}>
			<div className={styles.header}>لیست عکس های کروژل</div>
			{isLoading ? (
				Array.apply(0, Array(7)).map((x, i) => (
					<div
						key={i}
						className={styles.loading}>
						<div className={styles.loadingRect}></div>
						<div className={styles.loadingSquare}></div>
					</div>
				))
			) : (
				<table>
					<thead>
						<tr>
							{['Name', 'Keywords', 'Image', 'Description'].map((header) => (
								<th key={header}>{header}</th>
							))}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{(data?.carousel || []).map((brand) => (
							<tr key={brand._id}>
								<td>{brand.alt}</td>
								<td>
									{brand.keywords.map((keyword, index) => (
										<div
											key={index}
											className={styles.colorBox}>
											{keyword}
										</div>
									))}
								</td>
								<td>
									<Image
										src={`data:image/jpeg;base64,${brand.src}`}
										alt={brand.alt}
										width={77}
										height={77}
									/>
								</td>

								<td>
									<MdEditDocument className={styles.actionButton} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default List
