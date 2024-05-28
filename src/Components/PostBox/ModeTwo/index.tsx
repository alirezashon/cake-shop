/** @format */
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import { Add, Remove, Get } from '../../Basket/Actions'
import { useRouter } from 'next/router'

interface Post {
	_id: string
	title: string
	src: string
	subImages: [string]
	price: number
	categories: [string]
	brand: string
	size: string
	color: string[]
	quantity: number
	description: string
	keywords: [string]
	inBasket?: number
}

interface PostDisplayProps {
	posts: Post[]
}
const ModTwo: React.FC<PostDisplayProps> = ({ posts }) => {
	const [postStates, setPostStates] = useState<Post[]>(posts || [])
	const [basketStore, setBasketStore] = useState<string[][]>([])
	const router = useRouter()

	useEffect(() => {
		setBasketStore(Get())
	}, [])

	const increment = (id: string, price: number) => {
		Add(id, price)
		setBasketStore(Get())
	}

	const decrement = (id: string) => {
		Remove(id)
		setBasketStore(Get())
	}

	return (
		<div className={styles.container}>
			{postStates.map((obj) => (
				<div
					key={obj._id}
					className={styles.card}>
					<h3 className={styles.title}>{obj.title}</h3>
					<Image
						className={styles.photo}
						src={`data:image/jpeg;base64,${obj.src}`}
						alt={obj.title}
						width={11111}
						height={1111}
						onClick={() =>
							router.push(`http://localhost:3000/Post/${obj.title}`)
						}
						priority
					/>

					{basketStore[1] && basketStore[1].includes(obj._id) ? (
						<>
							<div className={styles.productDetails}>
								<div className={styles.details}>
									<div className={styles.priceBox}>
										<p>{obj.price}</p>
									</div>
									<div className={styles.controlBox}>
										<MdAddCircle
											className={styles.inceriment}
											size={'3vh'}
											onClick={() => increment(obj._id, obj.price)}
										/>
										<p className={styles.quantity}>
											{/* {obj.price *
												parseInt(
													basketStore[0][basketStore[1].indexOf(obj._id)].split(
														'*2%2&7(7)5%5!1@2'
													)[1]
												)} مجموع قیمت*/}
											{parseInt(
												basketStore[0][basketStore[1].indexOf(obj._id)].split(
													'*2%2&7(7)5%5!1@2'
												)[1]
											)}
										</p>
										<FaMinus
											className={styles.deceriment}
											size={'3vh'}
											onClick={() => decrement(obj._id)}
										/>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className={styles.bottomBox}>
								<AiOutlineShoppingCart
									size={'6vh'}
									color={'rgb(255,255,255)'}
									className={styles.basketBall}
									onClick={() => increment(obj._id, obj.price)}
								/>
								<p className={styles.price}> تومان {`${obj.price}`} </p>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default ModTwo
