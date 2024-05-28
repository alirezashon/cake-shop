/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../../models/Orders'
import Product from '../../../../models/Data/Product'
import db from '../../../../utils/index.js'
import ClientSession from '../../../../models/Client/Session'
import Client from '../../../../models/Client'
import { Post } from '../../../../DTO'
const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { products, attachment, authType } = req.body
			const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
			if (authType === 'S&H!O*P^I$N#G$T^I@M*E') {
				if (products.length > 0) {
					await db.connect2DB()
					const kalim = token && token.split('#')[1].replace(/"$/, '')
					const session = await ClientSession.findOne({
						key: kalim,
					})
					if (session && session.key === kalim) {
						const clientSchema = await Client.findOne({ _id: session.client })
						if (clientSchema) {
							const productsID = products?.map((product: string) =>
								product.split('*2%2&7(7)5%5!1@2')
							)
							const data: Post[] = []
							await Promise.all(
								productsID.map(async (id: string) => {
									const post = await Product.findOne({ _id: id[2] })
									data.push(post)
								})
							)

							const totalPrice = data.reduce((sum, post, index) => {
								if (post && post.price) {
									const quantityInBasket = productsID[index][1]
									const postPrice = post.price * quantityInBasket
									return sum + postPrice
								} else {
									console.error(
										'Null post object or missing price property:',
										post
									)
									return sum
								}
							}, 0)
							const order = {
								status: 'InProgress',
								client: session.client,
								products: data
									.filter((post) => post !== null)
									.map((product: Post) => product._id),
								totalPrice,
								attachment,
							}

							console.log(order)
							const newOrder = new Orders(order)
							await newOrder.save()
							res.status(200).json({ success: true })
						}
					} else {
						res
							.status(207)
							.json({ success: false, message: 'session is expired' })
					}
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
