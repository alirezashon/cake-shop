3/** @format */

import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
interface Data {
	client: string
	product: string
	totalPrice: number
	status: string
	ticketID: string
	images: string[]
}

const data: Data[] = [
	{
		client: 'akbarpor',
		product: 'sosisalma',
		totalPrice: 792450000000,
		status: 'InProgress',
		ticketID: 'cib-221202',
		images: ['/images/logo.png', '/images/logo.png'],
	},
	{
		client: 'akbarpor',
		product: 'sosisalma',
		totalPrice: 792450000000,
		status: 'InProgress',
		ticketID: 'cib-220203',
		images: ['/images/logo.png'],
	},
	{
		client: 'akbarr',
		product: 'salma',
		totalPrice: 7920000,
		status: 'Done',
		ticketID: 'cib-230504',
		images: ['/images/logo.png'],
	},
	{
		client: 'akpor',
		product: 'sosislma',
		totalPrice: 79000000,
		status: 'Rejected',
		ticketID: 'cib-240705',
		images: ['/images/logo.png'],
	},
]

const Orders = () => {
	const [state, setState] = useState<number>(0)
	const orderStatus = [
		['جاری', 'تحویل', 'مرجوع'],
		['InProgress', 'Done', 'Rejected'],
	]
	const month = [
		'فروردین',
		'اردیبهشت',
		'خرداد',
		'تیر',
		'مرداد',
		'شهریور',
		'مهر',
		'آبان',
		'آذر',
		'دی',
		'بهمن',
		'اسفند',
	]
	// const statusCounts = data.reduce((counts, item) => {
	//   counts[item.status] = (counts[item.status] || 0) + 1
	//   return counts
	// }, {})
	return (
		<>
			<div className={styles.container}>
				<div className={styles.toolBox}>
					<h4>سفارش های من</h4>
					{orderStatus[0].map((status, index) => (
						<div
							style={{
								background: `${
									state === index
										? 'radial-gradient(rgb(215, 253, 255), rgb(93, 179, 192))'
										: 'radial-gradient(rgb(221, 252, 253), rgb(215,215,255))'
								}`,
							}}
							key={status}
							onClick={() => setState(index)}>
							{status}

							{7}
						</div>
					))}
				</div>
				<div className={styles.orderBox}>
					{data?.length > 0 ? (
						data.map(
							(order, index) =>
								order.status === orderStatus[1][state] && (
									<div
										className={styles.order}
										key={order.ticketID}>
										<p>
											{' '}
											{order.ticketID.split('-')[1].substring(0, 2)}
											{order.ticketID.split('-')[1].substring(2, 3) === '0'
												? month[
														parseInt(
															order.ticketID.split('-')[1].substring(3, 4)
														) - 1
												  ]
												: month[
														parseInt(
															order.ticketID.split('-')[1].substring(2, 4)
														) - 1
												  ]}
										</p>
										{Object.entries(order).map((detail) => (
											<div
												key={detail[0]}
												className={styles.orderDetail}>
												{detail[0] === 'images' &&
													Array.isArray(detail[1]) &&
													detail[1].map((src: string, index) => (
														<div key={index}>
															<Image
																src={src}
																alt={src}
																width={111}
																height={111}
															/>
														</div>
													))}
												{detail[0] !== 'images' &&
													`${detail[0]} : ${detail[1]}`}
											</div>
										))}
									</div>
								)
						)
					) : (
						<div>شما تا کنون سفارشی ثبت نکرده اید. </div>
					)}
				</div>
			</div>
		</>
	)
}

export default Orders
