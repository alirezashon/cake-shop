/** @format */

import Product from '@/models/Data/Product'
import Order from '@/models/Orders'
import db from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'

const details = async (req: NextApiRequest, res: NextApiResponse) => {
	const { authType } = req.body
	const { ticketID } = req.query
	try {
		console.log('ticket id ', `${ticketID}`)
		if (authType === ')O(r*i&D^o#r@i@y#a^d&a^m^') {
			await db.connectToShop()
			const orders = await Order.findOne({ ticketID: `${ticketID}` })
			const products = await Promise.all(
				orders.products.map(async (id: string) => {
					return await Product.findOne({ _id: id })
				})
			)
 			res.status(200).json({orders,products})
		} else {
			res.status(409).json({ success: false })
		}
	} catch (err) {
		res.status(500).json({ err })
	}
}
export default details
