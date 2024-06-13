/** @format */

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import { Product } from '@/Interfaces'

interface OrderProducts {
	orders: Order[] | null
	loading: boolean
}
interface Order {
	ticketID: string
	status: string
	products: [Product]
	totalPrice: number
	attachment: string
}

const Orders: React.FC<OrderProducts> = ({ orders, loading }) => {
	const [state, setState] = useState<number>(0)
	const orderStatus = [
		['جاری', 'تحویل', 'مرجوع'],
		['InProgress', 'Done', 'Rejected'],
	]	

	return (
		<>
 			<div className={styles.container}>
				<div className={styles.toolBox}>
					<h4>سفارش های من</h4>
					{orderStatus[0].map((order, index) => (
						<div
							key={order}
							style={{
								background: `${
									state === index
										? ' radial-gradient(rgb(147, 245, 27), rgb(11, 91, 11))'
										: 'white'
								}`,
								color: `${state === index ? 'white' : 'rgba(0,39,0)'}`,
							}}
							onClick={() => setState(index)}>
							{order}
						</div>
					))}
				</div>
				<div className={styles.orderBox}>
					{loading
						? Array.apply(0, Array(7)).map((x, i) => (
								<div
									key={i}
									className={styles.loading}>
									<div className={styles.loadingRect}></div>
									<div className={styles.loadingSquare}></div>
								</div>
						  ))
						: orders?.map(
								(order: Order) =>
									order.status === orderStatus[1][state] && (
										<div
											className={styles.order}
											key={order.ticketID}
											onClick={() =>
												(window.location.href = `/profile/Orders/${order.ticketID}`)
											}>
											<div className={styles.orderDetail}>
												{order.products.map((product) => (
													<Image
														alt='attach'
														src={`data:image/jpeg;base64,${product.src}`}
														width={111}
														height={111}
													/>
												))}
											</div>
											<div className={styles.orderDetail}>
												<div className={styles.orderDetailRow}>شماره تیکت</div>
												<div className={styles.orderDetailRow}>
													{order.ticketID}
												</div>
											</div>
											<div className={styles.orderDetail}>
												<div className={styles.orderDetailRow}>تاریخ </div>
												<div className={styles.orderDetailRow}>
													{order.ticketID
														.split('-')[1]
														.slice(0, 6)
														.replace(/(..)(..)/, '$1/$2/')}
												</div>
											</div>
											{order.products.map((product) => (
												<div className={styles.orderDetail}>
													<div className={styles.orderDetailRow}>
														{product.title}
													</div>
												</div>
											))}

											<div className={styles.orderDetail}>
												<div className={styles.orderDetailRow}>مجموع قیمت</div>
												<div className={styles.orderDetailRow}>
													{order.totalPrice}
												</div>
											</div>
										</div>
									)
						  )}
				</div>
			</div>
		</>
	)
}

export default Orders
