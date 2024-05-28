/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Brand from '../../../../../../../models/Data/Types'
import Category from '../../../../../../../models/Data/Category'
import db from '../../../../../../../utils'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType } = req.body
			if (authType === '^c(a)t*E(g&o*x^z&i#Alim!') {
				await db.connectToShop()
				const brands = await Brand.find({})
				const categories = await Category.find({})
				res.status(200).json({ brands, categories })
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
