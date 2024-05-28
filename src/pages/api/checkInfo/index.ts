import { NextApiRequest, NextApiResponse } from 'next'
import { decryptText } from '../../../Components/CryptoUtils'
import ClientSession from '../../../models/Client/Session'
import Client from '../../../models/Client'
import db from '../../../utils/index.js'
const Validator = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType, token } = req.body
			if (authType === 'ClIeNt_ValidaTe*%') {
                await db.connectToShop()
				if (token) {
					const kalim = token.split('#')[1].replace(/"$/, '')
					const session = await ClientSession.findOne({
						key: kalim,
					})
 					if (session && session.key === kalim) {
						const decryptedPassword = decryptText(
							token.split('#')[0].replace(/^"/, ''),
							session.clientSessionToken.split('&')[2],
							session.clientSessionToken.split('&')[0]
						)
						const clientSchema = await Client.findOne({ _id: session.client })
						const validatePass =
							decryptedPassword.split('%')[1] +
							'&' +
							decryptedPassword.split('%')[0]

                            if (clientSchema.keyV === validatePass && clientSchema.information.address) {
							res.status(200).json({ success: true })
						} else {
							res
								.status(401)
								.json({ success: false, message: 'Session is not valid or client address is empty' })
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