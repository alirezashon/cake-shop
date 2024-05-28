/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import db from '../../../../../utils'
import Client from '../../../../../models/Client'
import ClientSession from '../../../../../models/Client/Session'
import Log from '../../../../../models/Log'
import {
	decryptText,
	generateKeyAndIV,
	encryptText,
} from '../../../../../Components/CryptoUtils'
const Generator = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			await db.connect2DB()
			const { userPass, authType } = req.body
			const logSchema = {
				user: userPass.split('&')[0],
				logName: 'Client Login',
				status: '',
			}
			if (authType === '&^ClieNt%LOgIn^&B*y^P$h#o@N#E') {
				const client = await Client.findOne({
					phone: userPass.split('&')[0],
				})

				if (client) {
					const decryptedCorrectPassword = decryptText(
						client.password,
						client.keyV.split('&')[0],
						client.keyV.split('&')[1]
					)
					if (userPass.split('&')[1] === decryptedCorrectPassword) {
						const { secretKey, iv } = generateKeyAndIV()
						const generateSession = encryptText(
							client.keyV.split('&')[1] + '%' + client.keyV.split('&')[0],
							secretKey,
							iv
						)
						const kalim = crypto.randomBytes(16).toString('hex')
						const token = generateSession + '#' + kalim
						const session = new ClientSession({
							client: client._id,
							clientSessionToken: iv + '&' + token + '&' + secretKey,
							key: kalim,
						})
						await session.save()
						logSchema.status = 'success'
						await new Log(logSchema).save()
						res
							.setHeader(
								'Set-Cookie',
								`CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k=${token}; Max-Age=${
									60 * 60 * 24 * 7 * 22
								}; HttpOnly; Secure; SameSite=Strict; Path=/;`
							)
							.status(200)
							.json({
								success: true,
								message: 'ورود با موفقیت انجام شد',
								token,
							})
					} else {
						logSchema.status = 'failed'
						await new Log(logSchema).save()
						res
							.status(401)
							.json({ success: false, message: 'رمز عبور اشتباه است' })
					}
				} else {
					res
						.status(209)
						.json({ success: false, message: 'نام کاربری یافت نشد' })
				}
			} else {
				res.status(407).json({ success: false, message: 'Invalid auth type' })
			}
		} else {
			res.status(409).json({ successs: false, message: 'Invalid request type' })
		}
	} catch (err) {
		if (err) {
			console.log(err)
			res
				.status(500)
				.json({ success: false, message: `Server Error => ${err}` })
		}
	}
}
export default Generator
