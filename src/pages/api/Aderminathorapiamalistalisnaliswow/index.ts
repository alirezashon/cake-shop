/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import db from '../../../utils'
import Admin from '../../../models/Admin'
import AdminSession from '../../../models/Admin/Session'
import Log from '../../../models/Log'
import {
	decryptText,
	generateKeyAndIV,
	encryptText,
} from '../../../Components/CryptoUtils'
const Generator = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			await db.connect2DB()
			const { userPass, authType } = req.body
			const logSchema = {
				user: userPass.split('&')[0],
				logName: 'Admin Login',
				status: '',
			}
			if (authType === '&^Admin%LOgIn^&B*y^P$h#o@N#E') {
				const admin = await Admin.findOne({
					email: userPass.split('&')[0],
				})
 
				if (admin) {
					const decryptedCorrectPassword = decryptText(
						admin.password,
						admin.keyV.split('&')[0],
						admin.keyV.split('&')[1]
					)
 					if (userPass.split('&')[1] === decryptedCorrectPassword) {
						const { secretKey, iv } = generateKeyAndIV()
						const generateSession = encryptText(
							admin.keyV.split('&')[1] + '%' + admin.keyV.split('&')[0],
							secretKey,
							iv
						)
						const kalim = crypto.randomBytes(16).toString('hex')
						const token = generateSession + '#' + kalim
						const session = new AdminSession({
							admin: admin._id,
							sessionToken: iv + '&' + token + '&' + secretKey,
							key: kalim,
						})
						console.log(token)
						await session.save()
						logSchema.status = 'success'
						await new Log(logSchema).save()
						res
							.setHeader(
								'Set-Cookie',
								`*a&D^d%d$D^M#i@m$M$i#n%i&a*m(o)kne3ykN2y@x=${token}; Max-Age=${
									60 * 60 * 222 
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
