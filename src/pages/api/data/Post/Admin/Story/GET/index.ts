/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Story from '../../../../../../../models/Data/Story'
import db from '../../../../../../../utils'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType } = req.body
			if (authType === '^c(a)t^s%T$#r&o$ry&o*uxs^ezl&i#A!') {
				await db.connectToShop()
				const story = await Story.find({})
 				res.status(200).json({ story })
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
