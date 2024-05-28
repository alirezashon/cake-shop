/** @format */

import Image from 'next/image'
import styles from './index.module.css'
import { FaMinus } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { Add, Get, Remove } from '../../../Basket/Actions'

interface Post {
	_id: string
	title: string
	src: string
	subImages: [string]
	price: number
	categories: [string]
	brand: string
	quantity: number
	description: string
	keywords: [string]
	inBasket?: number
}
interface Props {
	setLoading: boolean
}
const Products: React.FC<Props> = ({ setLoading }) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [basket, setBasket] = useState<string[][]>([])
	const [isloading, setIsLoading] = useState<boolean>(true)

	const getData = async (data: string[]) => {
		const response = await fetch('/api/data/Post/Client/bulk', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bulkID: data,
				authType: 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$',
			}),
		})
		const result = await response.json()

		setPosts(result.products)
		posts && setIsLoading(false)
	}
	useEffect(() => {
		setLoading && setIsLoading(true)
		const datasket = Get()
		getData(datasket[1])
		setBasket(datasket)
	}, [])

	const increment = (id: string, price: number) => {
		Add(id, price)
		setBasket(Get())
	}

	const decrement = (id: string) => {
		Remove(id)
		setBasket(Get())
	}
	return (
		<>
			{isloading
				? Array.apply(0, Array(7)).map((x, i) => (
						<div
							key={i}
							className={'loading'}>
							<div className={'loadingRect'}></div>
							<div className={'loadingSquare'}></div>
						</div>
				  ))
				: posts?.map((obj) => (
						<div
							key={obj._id}
							className={styles.postsContainer}>
							<div className={styles.productBox}>
								<Image
									src={`data:image/jpeg;base64,${obj.src}`}
									alt={obj.description}
									width={222}
									height={222}
									className={styles.image}
								/>
								<div className={styles.productDetails}>
									<div className={styles.title}>{obj.title}</div>
									<div className={styles.details}>
										<div className={styles.price}>{obj.price} تومان</div>
										<div className={styles.controlBox}>
											<MdAddCircle
												className={styles.inceriment}
												style={{
													opacity:
														parseInt(
															basket[0][basket[1].indexOf(obj._id)].split(
																'*2%2&7(7)5%5!1@2'
															)[3]
														) >= obj.quantity
															? 0.1
															: 1,
												}}
												size={'3vh'}
												onClick={() =>
													parseInt(
														basket[0][basket[1].indexOf(obj._id)].split(
															'*2%2&7(7)5%5!1@2'
														)[3]
													) < obj.quantity && increment(obj._id, obj.price)
												}
											/>
											{obj._id !== undefined && basket[1].includes(obj._id) ? (
												<p className={styles.quantity}>
													{parseInt(
														basket[0][basket[1].indexOf(obj._id)].split(
															'*2%2&7(7)5%5!1@2'
														)[1]
													)}
												</p>
											) : null}
											<FaMinus
												className={styles.deceriment}
												size={'3vh'}
												onClick={() => decrement(obj._id)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
				  ))}
		</>
	)
}
export default Products
