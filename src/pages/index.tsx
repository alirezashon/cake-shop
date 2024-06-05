
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Product,Category } from '../DTO'
import dynamic from 'next/dynamic'
import { Get } from '../Components/Basket/Actions'

const Handler = dynamic(() => import('../Handler'), {
	loading: () => <p>در حال بارگیری ...</p>,
})

interface Props {
	product: Product[]
	categories: Category[]
	carousel: [
		{
			_id: string
			src: string
			alt: string
			keywords: [string]
		}
	]
}

const RootPage: NextPage<Props> = ({ product, categories, carousel }) => {
	const [loading, setLoading] = useState<boolean>(true)
	const [totalPrice, setTotalPrice] = useState<[number, number]>([0, 0])
	const [basketData, setBasketData] = useState<Product[]>([])


	// const getData = async (data: string[]) => {
	// 	try {
	// 		const response = await fetch('/api/data/Post/Client/bulk', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({
	// 				bulkID: data,
	// 				authType: 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$',
	// 			}),
	// 		})
	// 		const result = await response.json()
	// 		setBasketData(result.products)
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error)
	// 	}
	// }

	// const bascalculator = (data: string[][]) => {
	// 	const [totalPrice, totalQuantity] = data[0].reduce(
	// 		(acc, item) => {
	// 			const parts = item.split('*2%2&7(7)5%5!1@2')
	// 			const itemPrice = parseInt(parts[1]) * parseInt(parts[3])
	// 			const itemQuantity = parseInt(parts[3])
	// 			return [acc[0] + itemPrice, acc[1] + itemQuantity]
	// 		},
	// 		[0, 0]
	// 	)
	// 	setTotalPrice([totalPrice, totalQuantity])
	// }
	// const updateBasket = (item: string[][]) => {
	// 	setBasketStore(item)
	// 	bascalculator(basketStore)
	// }
	
	return (
		<>
			<NextSeo
				title='RoomMode'
				description='...'
				canonical='https://www.roommode.ir/'
				openGraph={{
					url: 'https://www.roommode.ir/',
					title: '...',
					description: 'Open Graph Description',
					images: [
						{
							url: 'https://www.example.ie/og-image-01.jpg',
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: 'https://www.example.ie/og-image-02.jpg',
							width: 900,
							height: 800,
							alt: 'Og Image Alt Second',
						},
						{ url: 'https://www.example.ie/og-image-03.jpg' },
						{ url: 'https://www.example.ie/og-image-04.jpg' },
					],
				}}
			/>
			{loading ? (
				<div
					style={{
						width: '100vw',
						height: '100vh',
						background: ` repeating-linear-gradient(
			90deg,
			#d6c66b,
			#eebe20 5vh,
			#fbf5a0 5vh,
			#ffffff 10vh
		)`,
					}}></div>
			) : (
				<Handler
					products={product}
					totalPrice={totalPrice}
					categories={categories}
					basketData={basketData}
				/>
			)}
		</>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	try {
		const res = await fetch(
			`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category: '@L$L%O%F#D%M^',
					authType: 'G&E!T*P^R$O#D$U^C@T*S',
				}),
			}
		)
		const result = await res.json()

		const product = result.products || []
		const categories = result.categories || []
		const carousel = result.carousel || []

		return {
			props: {
				product,
				carousel,
				categories,
			},
		}
	} catch (error) {
		console.error('Error fetching initial props:', error)
		return { props: { product: [], carousel: [], categories: [] } }
	}
}

export default RootPage
