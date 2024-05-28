/** @format */

import { useEffect, useState } from 'react'
import Orders from '../../Showrder'
import { Post } from '@/DTO'

interface Order {
	ticketID: string
	status: string
	products: [Post]
	totalPrice: number
	attachment: string
}

const Ordero = () => {
	const [loading, setLoading] = useState<boolean>(true)
	const [data, setData] = useState<Order[] | null>(null)


	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/data/Post/Admin/orders', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						authType: '(k*i)o&R^D&e$r#o@l!A$n%S*o(7)',
					}),
				})
				const responseData = await response.json()
				setData(responseData.orders)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		if (!data) {
			fetchData()
		}
	}, [setData])
	return (
		<>	
			<div>
				<Orders
					orders={data}
					loading={loading}
				/>
			</div>
		</>
	)
}

export default Ordero
