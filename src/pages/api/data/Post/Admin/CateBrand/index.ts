/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Type from '../../../../../../models/Data/Types'
import Category from '../../../../../../models/Data/Category'
import db from '../../../../../../utils'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { user, aydi } = req.query
			const { authType, data, action } = req.body
			if (authType === '^c(a)t*E(g&o*x^z&i#m!') {
				await db.connectToShop()
				if (action === '(*I&n()s*e(r&t*^%t^O&n*E(') {
					await Category.create(data)
					res.status(200).json({ success: true })
				} else if (action === ')U*p)d(r%a$t#e@i*n(') {
					if (aydi && aydi.length > 0) {
						;(await Category.findOneAndUpdate({ _id: aydi }, data))
							? res.status(200).json({ success: true })
							: res.status(401).json({ success: false })
					} else {
						res.status(402).json({ success: false })
					}
				} else if (action === '&d*E^l&E%e#t^e$o%f@') {
					if (aydi && aydi.length > 0) {
						;(await Category.findByIdAndDelete({ _id: aydi }, data))
							? res.status(200).json({ success: true })
							: res.status(401).json({ success: false })
					} else {
						res.status(402).json({ success: false })
					}
				} else {
					res.status(405).json({ success: false })
				}
			} else if (authType === '(b&r^i%a&N^d$i^s#e!k%)') {
				await db.connectToShop()
				if (action === '(*I&n()s*e(r&t*^%t^O&n*E(') {
					await Type.create(data)
					res.status(200).json({ success: true })
				} else if (action === ')U*p)d(r%a$t#e@i*n(') {
					if (aydi && aydi.length > 0) {
						;(await Type.findOneAndUpdate({ _id: aydi }, data))
							? res.status(200).json({ success: true })
							: res.status(401).json({ success: false })
					} else {
						res.status(402).json({ success: false })
					}
				} else if (action === '&d*E^l&E%e#t^e$o%f@') {
					if (aydi && aydi.length > 0) {
						;(await Type.findByIdAndDelete({ _id: aydi }, data))
							? res.status(200).json({ success: true })
							: res.status(401).json({ success: false })
					} else {
						res.status(402).json({ success: false })
					}
				} else {
					res.status(405).json({ success: false })
				}
			} else {
				res.status(407).json({ success: false })
			}
		} else {
			res.status(409).json({ success: false })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}

export default cateBrand
