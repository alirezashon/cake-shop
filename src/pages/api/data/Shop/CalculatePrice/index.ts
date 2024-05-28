/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../models/Data/Product'
import db from '../../../../../utils/index.js'
import { Post } from '@/DTO'
const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
	try { 
		if (req.method === 'POST') {
			const { products, authType } = req.body
			if (authType === 'S&H!O*P^I$N#G$T^I@M*E') {
				if (products.length > 0) {
					await db.connectToShop()
					const productsID = products?.map((product: string) =>
						product.split('*2%2&7(7)5%5!1@2')
					)
					const data: Post[] = []
					await Promise.all(
						productsID.map(async (id: string) => {
							const post = await Product.findOne({ _id: id[0] })
							data.push(post)
						})
					)
					
					const totalPrice = data.length > 0 && data.reduce((sum, post, index) => {
						const quantityInBasket = productsID[index][1]
						const postPrice = post.price * quantityInBasket
						return sum + postPrice
					}, 0)
 
					res.status(200).json({ success: true, totalPrice })
				} else {
					res.status(406).json({ success: false, message: 'Basket is Empty' })
				}
			} else {
				res.status(407).json({ success: false, message: 'Invalid Auth Type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid Request Type' })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}
export default Shop
