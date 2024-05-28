/** @format */

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { MdEditDocument } from 'react-icons/md'
import styles from './index.module.css' // Update with your CSS file path

interface Category {
	_id: string
	name: string
	src: string
	description: string
	keywords: string[]
}

interface Brand {
	_id: string
	name: string
	en: string
	src: string
	description: string
	keywords: string[]
}

const List: React.FC = () => {
	const [data, setData] = useState<{
		brands: Brand[]
		categories: Category[]
	} | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/data/Post/Admin/CateBrand/GET', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ authType: '^c(a)t*E(g&o*x^z&i#Alim!' }), // Update with your authType
				})

				if (response.ok) {
					const result = await response.json()
					setData(result)
					setIsLoading(false)
				} else {
					toast.error('Oops! Something went wrong.')
					setIsLoading(false)
				}
			} catch (error) {
				console.error('Error:', error)
				toast.error('An error occurred. Please try again later.')
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<div className={styles.tableContainer}>
			<div className={styles.header}>لیست برند و کتگوری</div>
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
						{(data?.brands || []).map((brand) => (
							<tr key={brand._id}>
								<td>{brand.name}</td>
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
										alt={brand.name}
										width={77}
										height={77}
									/>
								</td>
								<td>{brand.description}</td>
								<td>
									<MdEditDocument className={styles.actionButton} />
								</td>
							</tr>
						))}
						{(data?.categories || []).map((category) => (
							<tr key={category._id}>
								<td>{category.name}</td>
								<td>
									<Image
										src={`data:image/jpeg;base64,${category.src}`}
										alt={category.name}
										width={77}
										height={77}
									/>
								</td>
								<td>
									{category.keywords.map((keyword, index) => (
										<div
											key={index}
											className={styles.colorBox}>
											{keyword}
										</div>
									))}
								</td>
								<td>{category.description}</td>
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
