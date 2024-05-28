/** @format */

import { GetServerSideProps, NextPage } from 'next'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { Add, Remove, Get } from '@/Components/Basket/Actions'
import styles from '../../Components/PostBox/ModOne/index.module.css'
interface HomeProps {
	posts: [Post]
}
interface Post {
	_id: string
	title: string
	src: string
	subImages: [string]
	price: number
	categories: [string]
	brand: string
	size: String
	color: String[]
	quantity: number
	description: string
	keywords: [string]
	inBasket?: number
}

const Post: NextPage<HomeProps> = ({ posts }) => {
	const [postStates, setPostStates] = useState<Post[]>(posts)
	const [basketStore, setBasketStore] = useState<string[][]>([])

	const increment = (id: string, price: number) => {
		Add(id, price)
		setBasketStore(Get())
	}

	const decrement = (id: string) => {
		Remove(id)
		setBasketStore(Get())
	}
	useEffect(() => {
		setBasketStore(Get())
	}, [setBasketStore])

	return (
		<div className={styles.postsBox}>
			<div className={styles.innerPostsBox}>
				{postStates.map((obj: Post, index: number) => (
					<div
						className={styles.postBox}
						key={obj._id}>
						<div className={styles.innerPostBox}>
							<h6 className={styles.title}>{obj.title}</h6>
							<Image
								src={obj.src}
								alt={obj.description}
								width={1111}
								height={1111}
								className={styles.image}
								priority
							/>
							{basketStore[1] && basketStore[1].includes(obj._id) ? (
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
											<p className={styles.quantity}>{obj.inBasket}</p>
											<FaMinus
												className={styles.deceriment}
												size={'3vh'}
												onClick={() => decrement(obj._id)}
											/>
										</div>
									</div>
								</div>
							) : (
								<div className={styles.priceBasketBox}>
									<div className={styles.innerPriceBasketBox}>
										<div className={styles.priceBasket}>
											<div
												className={styles.icon}
												onClick={() => increment(obj._id, obj.price)}>
												<AiOutlineShoppingCart
													size={'3vh'}
													color={'rgb(255,255,255)'}
												/>
											</div>
											<p className={styles.price}>{obj.price}</p>
										</div>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const res = await fetch(
		`http://${process.env.PRODUCTION_PORT}/api/data/Post/Client`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				category: '@L$L%O%F#D%M^',
				authType: 'G&E!T*P^R$O#D$U^C@T*S',
			}),
		}
	)
	const callPosts = await res.json()
	const posts = callPosts.products

	return {
		props: {
			posts,
		},
	}
}

export default Post
