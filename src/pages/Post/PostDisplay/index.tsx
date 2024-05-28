/** @format */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { Add, Remove } from '@/Components/Basket/Actions'
import styles from './index.module.css'
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
interface BasketStore {
	id: string
	count: number
}
interface PostsDisplayProps {
	posts: Post[]
}
const PostDisplay: React.FC<PostsDisplayProps> = ({ posts }) => {
	const [postStates, setPostStates] = useState<Post[]>(
		posts?.filter((post: Post) => ({
			post,
			inBasket: 0,
		})) || []
	)
	const [basketStore, setBasketStore] = useState<string[]>([])
	const router = useRouter()
	const updateBasketState = (posts: Post[], basketItems: BasketStore[]) => {
		const updatedPosts = posts?.map((post) => {
			const matchingItem = basketItems.find((item) => item.id === post._id)

			return {
				...post,
				inBasket: matchingItem ? matchingItem.count : 0,
			}
		})

		setPostStates(updatedPosts)
	}

	const increment = (id: string, price: number) => {
		Add(id, price)
 	}

	const deceroment = (id: string) => {
		Remove(id)
		setBasketStore((prev) => [...prev, id])
	}

	useEffect(() => {
		const basketPost: string[] = JSON.parse(
			localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
		)
		const basketSide: BasketStore[] = []

		if (basketPost.length > 0) {
			basketPost.forEach((post) => {
				const [postId, quantityStr] = post.split('*2%2&7(7)5%5!1@2')
				const count = parseInt(quantityStr)
				basketSide.push({ id: postId, count })
			})
		}
		updateBasketState(posts, basketSide)
	}, [basketStore, posts])

	return (
		<div className={styles.postsBox}>
			<div className={styles.innerPostsBox}>
				{postStates.map((obj, index: number) => (
					<div
						className={styles.postBox}
						key={obj._id}>
						<div className={styles.postHeaderBox}>
							{obj.inBasket && obj.inBasket > 0 ? (
								<div className={styles.count}>{obj.inBasket}</div>
							) : null}
							<h6 className={styles.title}>{obj.title}</h6>
						</div>
						<div className={styles.innerPostBox}>
							<div className={styles.imageBox}>
								<Image
									src={`data:image/jpeg;base64,${obj.src}`}
									alt={obj.description}
									width={200}
									height={200}
									className={styles.image}
									onClick={() =>
										window.open(
											`http://localhost:${process.env.PRODUCTION_PORT}/Post/${obj.title}`
										)
									}
								/>
							</div>

							{obj.inBasket && obj.inBasket > 0 ? (
								<div className={styles.productDetails}>
									<div className={styles.details}>
										<div className={styles.controlBox}>
											<MdAddCircle
												className={styles.inceriment}
												style={{
													opacity:
														obj.inBasket && obj.inBasket === obj.quantity
															? 0.1
															: 1,
												}}
												size={'3vh'}
												onClick={() =>
													obj.inBasket && obj.inBasket < obj.quantity
														? increment(obj._id, obj.price)
														: ''
												}
											/>
											<div className={styles.priceBox}>
												<p>مجموع {obj.price - 7777 * obj.inBasket}</p>
											</div>
											<FaMinus
												className={styles.deceriment}
												size={'3vh'}
												onClick={() => deceroment(obj._id)}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className={styles.innerPriceBasketBox}>
									<div
										className={styles.priceBasket}
										onClick={() => increment(obj._id, obj.price)}>
										<div className={styles.iconBox}>
											<AiOutlineShoppingCart
												size={'5vh'}
												color={'rgb(255,255,255)'}
												className={styles.icon}
											/>
											<div className={styles.quantity}>{obj.quantity}</div>
										</div>
										<a className={styles.price}> {obj.price} تومان </a>
									</div>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default PostDisplay
