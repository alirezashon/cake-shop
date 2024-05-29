/** @format */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { Add, Remove, Get } from '../../Basket/Actions'
import styles from './index.module.css'
import Link from 'next/link'
import { Post } from '@/DTO'

interface PostsDisplayProps {
	posts: Post[]
	basketStore: string[][]
	setBasketStore: (items: string[][]) => void
}
const ModOne: React.FC<PostsDisplayProps> = ({
	posts,
	basketStore,
	setBasketStore,
}) => {
	const [isMobile, setIsMobile] = useState<boolean>(true)
	const [lazyOnScroll, setLazyOnScroll] = useState<number>(0)


	const increment = (id: string, price: number) => {
		Add(id, price)
		setBasketStore(Get())
	}

	const decrement = (id: string) => {
		Remove(id)
		setBasketStore(Get())
	}

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const scrollPart = window.scrollY / window.innerHeight
			setLazyOnScroll(parseInt(scrollPart.toFixed(), 10))
		})

		if (window.innerWidth > 777) {
			setIsMobile(false)
		}
	}, [setIsMobile, setBasketStore])

	return (
		<>
			<div className={styles.postsBox}>
				<div className={styles.innerPostsBox}>
					{posts
						.slice(
							0,
							isMobile ? 6 * (lazyOnScroll + 2) : 12 * (lazyOnScroll + 2)
						)
						.map((obj, index: number) => (
							<div
								className={styles.postBox}
								key={obj._id}>
								{isMobile}
								<h6 className={styles.title}>{obj.title}</h6>
								<div className={styles.innerPostBox}>
									<div className={styles.imageBox}>
										<Link
											target='blank'
											href={`/Post/${obj.title}`}>
											<Image
												src={`data:image/jpeg;base64,${obj.src}`}
												alt={obj.description}
												width={200}
												height={200}
												className={styles.image}
											/>
										</Link>
									</div>
									{basketStore[1] && basketStore[1].includes(obj._id) ? (
										<div className={styles.productDetails}>
											<div className={styles.details}>
												<div className={styles.priceBox}>
													<p>
														مجموع :
														{obj.price *
															parseInt(
																basketStore[0][
																	basketStore[1].indexOf(obj._id)
																].split('*2%2&7(7)5%5!1@2')[3]
															)}
													</p>
												</div>
												<div className={styles.controlBox}>
													<MdAddCircle
														className={styles.inceriment}
														style={{
															opacity:
																parseInt(
																	basketStore[0][
																		basketStore[1].indexOf(obj._id)
																	].split('*2%2&7(7)5%5!1@2')[3]
																) >= obj.quantity
																	? 0.1
																	: 1,
														}}
														size={'3vh'}
														onClick={() =>
															parseInt(
																basketStore[0][
																	basketStore[1].indexOf(obj._id)
																].split('*2%2&7(7)5%5!1@2')[3]
															) < obj.quantity && increment(obj._id, obj.price)
														}
													/>
													<p className={styles.count}>
														{obj._id &&
															parseInt(
																basketStore[0][
																	basketStore[1].indexOf(obj._id)
																].split('*2%2&7(7)5%5!1@2')[1]
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
													<p className={styles.quantity}>{obj.quantity}</p>
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
		</>
	)
}

export default ModOne
