import { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { Get, Add, Remove } from '../../Components/Basket/Actions'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { useBasket } from "@/Context/Basket"

interface Data {
	_id: string
	title: string
	src: string
	subImages: string[]
	price: number
	categories: string[]
	brand: string
	size: String
	color: String[]
	quantity: number
	description: string
	keywords: string[]
}
interface Props {
	searchString: string
}
const Related: React.FC<Props> = ({ searchString }) => {
	const router = useRouter()
	const [data, setData] = useState<Data[]>([])
	const { basket, setBasket } = useBasket()
	const [isloading, setIsLoading] = useState<boolean>(true)

	const fetchAll = async () => {
		setIsLoading(true)
		const res = await fetch('/api/data/Post/Client', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				category: '@L$L%O%F#D%M^',
				authType: 'G&E!T*P^R$O#D$U^C@T*S',
			}),
		})
		const rslt = await res.json()
		setData(rslt.products)
		setIsLoading(false)
	}
	useEffect(() => {
		setBasket(Get())
		;(async () => {
			const response = await fetch('/api/data/Post/Client/productsByCategory', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category: searchString,
					authType: ')g(e&t*C^a&t%eG#o$r#I@e%',
				}),
			})
			const result = await response.json()
			if (result.products?.length > 0) {
				setData(result.products)
				setIsLoading(false)
			} else {
				fetchAll()
			}
		})()
	}, [setData, searchString])

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
			{isloading ? (
				Array.apply(0, Array(7)).map((x, i) => (
					<div
						key={i}
						className={styles.loading}>
						<div className={styles.loadingRect}></div>
						<div className={styles.loadingSquare}></div>
					</div>
				))
			) : (
				<div className={styles.container}>
					{data?.map((detail, index) => (
						<div
							key={index}
							className={styles.productBox}>
							<div className={styles.socialBox}>
								<h4 className={styles.title}>{detail.title}</h4>
								<Image
									src={`data:image/jpeg;base64,${detail.src}`}
									alt={detail.title}
									width={200}
									height={200}
									className={styles.image}
									onClick={() => router.push(`/Post/${detail.title}`)}
								/>
							</div>
							<div className={styles.priceAction}>
								{basket[1] && basket[1].includes(detail._id) ? (
									<div className={styles.productDetails}>
										<div className={styles.details}>
											<div className={styles.priceBox}>
												<p>
													{detail.price *
														parseInt(
															basket[0][
																basket[1].indexOf(detail._id)
															].split('*2%2&7(7)5%5!1@2')[1]
														)}
												</p>
											</div>
											<div className={styles.controlBox}>
												<MdAddCircle
													className={styles.inceriment}
													style={{
														opacity:
															parseInt(
																basket[0][
																	basket[1].indexOf(detail._id)
																].split('*2%2&7(7)5%5!1@2')[2]
															) >= detail.quantity
																? 0.1
																: 1,
													}}
													size={'4vh'}
													onClick={() =>
														parseInt(
															basket[0][
																basket[1].indexOf(detail._id)
															].split('*2%2&7(7)5%5!1@2')[2]
														) < detail.quantity &&
														increment(detail._id, detail.price)
													}
												/>
												<p className={styles.count}>
													{parseInt(
														basket[0][
															basket[1].indexOf(detail._id)
														].split('*2%2&7(7)5%5!1@2')[2]
													)}
												</p>
												<FaMinus
													className={styles.deceriment}
													size={'4vh'}
													onClick={() => decrement(detail._id)}
												/>
											</div>
										</div>
									</div>
								) : (
									<div className={styles.bottomBox}>
										<AiOutlineShoppingCart
											size={'4vh'}
											color={'rgb(255,255,255)'}
											className={styles.basketBall}
											onClick={() => increment(detail._id, detail.price)}
										/>
										<p className={styles.price}> تومان {`${detail.price}`} </p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}{' '}
		</>
	)
}
export default Related
