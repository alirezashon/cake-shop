/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../../../../models/Orders'
import AdminSession from '../../../../../../models/Admin/Session'
import Admin from '../../../../../../models/Admin'
import Product from '../../../../../../models/Data/Product'
import db from '../../../../../../utils/index.js'

const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType } = req.body
			const token = req.cookies['*a&D^d%d$D^M#i@m$M$i#n%i&a*m(o)kne3ykN2y@x']

			if (authType === '(k*i)o&R^D&e$r#o@l!A$n%S*o(7)') {
				await db.connectToShop()
				const kalim = token && token.split('#')[1].replace(/"$/, '')
				const session = await AdminSession.findOne({
					key: kalim,
				})
				if (session && session.key === kalim) {
					const adminSchema = await Admin.find({ _id: session.admin })
					if (adminSchema) {
						const orders =
							adminSchema &&
							(await Orders.find(
								{ },
								{
									_id: 0,
									ticketID: 1,
									status: 1,
									client: 1,
									products: 1,
									totalPrice: 1,
									attachment: 1,
								}
							).catch((error) =>
								console.error('Error fetching orders:', error)
							))
						if (orders)
							for (const order of orders) {
								const productIds = order.products // Assuming order.products is an array of product IDs
								const products = await Product.find({ _id: { $in: productIds } })
								order.products = products
							}

 						res.status(200).json({ success: true, orders })
					}
				} else {
					res
						.status(207)
						.json({ success: false, message: 'session is expired' })
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
