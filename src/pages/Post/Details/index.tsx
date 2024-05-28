/** @format */

import { GetServerSideProps } from 'next'
import styles from './index.module.css'
import Carouselali from '../../../Components/Carouselali'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import Link from 'next/link'
import { Add, Remove, Get } from '../../../Components/Basket/Actions'
import Image from 'next/image'
import Related from '../../../Components/Related'
import { useEffect, useState } from 'react'
import Toast from '@/Components/Toast'
interface PostProps {
	post: {
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
	}
}

const Details: React.FC<PostProps> = ({ post }) => {
	const [basketStore, setBasketStore] = useState<string[][]>([])

	const sendToast = (message: string, color: string) => {
		return (
			<Toast
				text={message}
				color={color}
				direction='topLeft'
			/>
		)
	}
	const increment = (id: string,price:number) => {
		Add(id,price)
		setBasketStore(Get())
		sendToast('افزوده شد', 'green')
	}

	const decrement = (id: string) => {
		Remove(id)
		setBasketStore(Get())
		sendToast('حذف شد', 'red')
	}

	useEffect(() => {
		setBasketStore(Get())
	}, [setBasketStore])

	return (
		<>
			<div className={styles.screenBox}>
				<div className={styles.related}>
					<Related searchString='' />
				</div>
				<div className={styles.priceRow}>
					<span> {post.price} تومان </span>
				</div>
				<div className={styles.screenBody}>
					<div className={styles.screenIssueLogoBox}>
						<Image
							width={1111}
							height={1111}
							alt='post'
							className={styles.issueScreenLogo}
							src='/images/icon.png'
						/>
					</div>
					<div className={styles.container}>
						<div className={styles.title}>
							<span>{post.title} </span>
						</div>

						<div className={styles.detailsBox}>
									<div className={styles.innerPostBox}>
							<div className={styles.postBox}>
								<div className={styles.postDetails}>
									<div className={styles.textBox}>
										<p className={styles.text}>
											<span>برند : </span>
											<span>{post.brand} </span>
										</p>
									</div>

									<div className={styles.detailsRow}>
										<span>تعداد : </span>
										<span>{post.quantity} </span>
									</div>
									<div className={styles.colorBox}>
										{post.color.map((color, index) => (
											<div
												key={index}
												style={{ backgroundColor: `${color}` }}
												className={styles.color}></div>
										))}
									</div>
								</div>
							</div>
										<div className={styles.imageBox}>
											<Link
												target='blank'
												href={`/Post/${post.title}`}>
												<Image
													src={`data:image/jpeg;base64,${post.src}`}
													alt={post.description}
													width={777}
													height={200}
													className={styles.image}
												/>
											</Link>
										</div>
										{basketStore[1] && basketStore[1].includes(post._id) ? (
											<div className={styles.productDetails}>
												<div className={styles.details}>
													<div className={styles.priceBox}>
														مجموع :
														{post.price *
															parseInt(
																basketStore[0][
																	basketStore[1].indexOf(post._id)
																].split('*2%2&7(7)5%5!1@2')[1]
															)}
													</div>
													<div className={styles.controlBox}>
														<MdAddCircle
															className={styles.inceriment}
															style={{
																opacity:
																	parseInt(
																		basketStore[0][
																			basketStore[1].indexOf(post._id)
																		].split('*2%2&7(7)5%5!1@2')[1]
																	) >= post.quantity
																		? 0.1
																		: 1,
															}}
															size={'3vh'}
															onClick={() =>
																parseInt(
																	basketStore[0][
																		basketStore[1].indexOf(post._id)
																	].split('*2%2&7(7)5%5!1@2')[1]
																) < post.quantity && increment(post._id,post.price)
															}
														/>
														<p className={styles.count}>
															{post._id &&
																parseInt(
																	basketStore[0][
																		basketStore[1].indexOf(post._id)
																	].split('*2%2&7(7)5%5!1@2')[1]
																)}
														</p>
														<FaMinus
															className={styles.deceriment}
															size={'3vh'}
															onClick={() => decrement(post._id)}
														/>
													</div>
												</div>
											</div>
										) : (
											<div className={styles.innerPriceBasketBox}>
												<div
													className={styles.priceBasket}
													onClick={() => increment(post._id,post.price)}>
													<div className={styles.iconBox}>
														<AiOutlineShoppingCart
															size={'5vh'}
															color={'rgb(255,255,255)'}
															className={styles.icon}
														/>
														<p className={styles.quantity}>{post.quantity}</p>
													</div>
													<a className={styles.price}> {post.price} تومان </a>
												</div>
											</div>
										)}
									</div>
							<div className={styles.carouselaliBox}>
								<Carouselali
									structure={post.subImages.map((subImage) => ({
										src: subImage,
										alt: post.title,
									}))}
								/>
							</div>
						</div>
						<div className={styles.bottomBox}>
							<div className={styles.detailsRow}>
								<span>توضیحات : </span>
								<span>{post.description} </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
	params,
}) => {
	const title = params?.id as string
	console.log(params)
	const res = await fetch(
		`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client/page`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				category: '@L$L%O%F#D%M^',
				title: title, // Updated to use the post title as ID
				authType: 'G&E!T*P^R$O#D$U^C@T*S',
			}),
		}
	)
	const postData = await res.json()
	return {
		props: {
			post: postData.products, // Assuming your API response has a "products" field
		},
	}
}
export default Details

{
	/* <SelectList
								structure={[
									{
										name: 'محصولات',
										options: [
											{
												name: 'ازینا',
												options: ['گیر خامه عصرشون', 'تیپ یک یکشون'],
											},
											{
												name: 'ازونا',
												options: [
													{ name: 'پرتقالوزادنن', options: ['دوشواریشکن'] },
													{ name: 'همهدارن', options: ['ایناندارن'] },
												],
											},
										],
									},
									{
										name: 'سفارشی سازی',
										options: ['سرتاتشو', 'فقط وسطاشو', 'بغلاشو'],
									},
									{
										name: 'پروفایل کاربری',
										options: ['تاریخچه خرید', 'مدیریت '],
									},
									{ name: 'خدمات', options: ['ماساژ غضروف'] },
									{ name: 'تماس با ما', options: ['0700600500137'] },
									{ name: 'درباره ی ما', options: ['همیشه خفناسا'] },
								]}
							/> */
}
