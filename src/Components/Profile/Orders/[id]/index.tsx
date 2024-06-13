/** @format */

import { Product } from '@/Interfaces'
import { GetServerSideProps, NextPage } from 'next'
import styles from './index.module.css'

interface OrderProducts {
	products: Product[]
	orders: Order
}
interface Order {
	_id: string
	ticketID: string
	status: string
	client: string
	products: [Product] | String
	totalPrice: number
}


const OrderUI: NextPage<OrderProducts> = (orderData) => {
	return (
		<>
		<div className={styles.container}></div>
			<div>{orderData.orders.ticketID}</div>
			<div>{orderData.orders.status}</div>
			<div>{orderData.orders.totalPrice}</div>

			<h1>Posts</h1>
			{orderData.products.map((product) => (
				<>
					<div>{product.title}</div>
					<div>{product.categories}</div>
					<div>{product.price}</div>
					<div>{product.description}</div>
					<div>{product.keywords}</div>
				</>
			))}
		</>
	)
}
export const getServerSideProps: GetServerSideProps<OrderProducts> = async ({
	params,
}) => {
	const ticketId = params?.ticketID as string
	console.log(params)
	const res = await fetch(
		`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client/orders/details?ticketID=${params?.id}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// client: '65e0299f524fa364a568b636',
				authType: ')O(r*i&D^o#r@i@y#a^d&a^m^',
			}),
		}
	)
	const orderData = await res.json()
	console.log(orderData.products)
	return {
		props: orderData,
	}
}
export default OrderUI
