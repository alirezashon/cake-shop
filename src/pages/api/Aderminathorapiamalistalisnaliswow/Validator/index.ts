/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import { decryptText } from '../../../../Components/CryptoUtils'
import AdminSession from '../../../../models/Admin/Session'
import Admin from '../../../../models/Admin'
import db from '../../../../utils/index.js'
const Validator = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType, token } = req.body
			if (authType === 'Admin_ValidaTe*%') {
				if (token) {
					await db.connectToShop()
					const kalim = token.split('#')[1].replace(/"$/, '')

					const session = await AdminSession.findOne({
						key: kalim,
					})
					console.log(session)
					if (session && session.key === kalim) {
						const decryptedPassword = decryptText(
							token.split('#')[0].replace(/^"/, ''),
							session.sessionToken.split('&')[2],
							session.sessionToken.split('&')[0]
						)
						const adminSchema = await Admin.findOne({ _id: session.admin })
 						const validatePass =
							decryptedPassword.split('%')[1] +
							'&' +
							decryptedPassword.split('%')[0]

						if (adminSchema.keyV === validatePass) {
							res.status(200).json({ success: true, message: 'token exist' })
						} else {
							res
								.status(401)
								.json({ success: false, message: 'Session is not valid' })
						}
					} else {
						res
							.status(207)
							.json({ success: false, message: 'session is expired' })
					}
				} else {
					res.status(207).json({
						success: false,
						message: 'validation failed token not exist',
					})
				}
			} else {
				res.status(407).json({ success: false, message: 'Invalid auth type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid method' })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}
export default Validator
