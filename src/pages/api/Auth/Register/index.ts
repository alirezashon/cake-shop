/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../../models/Client'
import ClientSession from '../../../../models/Client/Session'
import Log from '../../../../models/Log'
import db from '../../../../utils'
import {
	generateKeyAndIV,
	encryptText,
} from '../../../../Components/CryptoUtils'
import crypto from 'crypto'
const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await db.connect2DB()
		if (req.method === 'POST') {
			const {
				phone,
				name,
				password,
				authType,
				nationalCode,
				houseNumber,
				houseUnit,
				zipCode,
				email,
				address,
			} = req.body
			console.log(req.body)
			const logSchema = {
				user: phone,
				details: 'Register new user',
				logName: 'Rgister',
				status: '',
			}
			const registerScheme = {
				email,
				name,
				nationalCode,
				phone,
				password,
				information: {
					address,
					houseNumber,
					houseUnit,
					zipCode,
				},
				keyV: '',
			}
			//Register
			if (authType === 'C%L&i&E^n$T#R&E^g@i&s%T$e#R') {
				const userSchema = await Client.findOne({ phone })
				if (userSchema?.length > 0) {
					logSchema.status = 'failed'
					const failedSignIn = new Log(logSchema)
					await failedSignIn.save()
 					console.table(logSchema)
					res
						.status(209)
						.json({ message: 'نام کاربری یکتا نمی باشد', success: false })
				} else {
					logSchema.status = 'success'
					const { secretKey, iv } = generateKeyAndIV()
					const encryptedPassword = encryptText(password, secretKey, iv)
					registerScheme.password = encryptedPassword
					registerScheme.keyV = secretKey + '&' + iv
					const newClient = new Client(registerScheme)
					newClient.save()
					console.log('new client registered')
					console.table(logSchema)
					const successSignIn = new Log(logSchema)
					successSignIn.save()
					// generate tokenoghliofskiachinachofskiskikoskadani
					const generateTokenoghlo = async () => {
						const { secretKey, iv } = generateKeyAndIV()
						const generateSession = encryptText(
							registerScheme.keyV.split('&')[1] +
								'%' +
								registerScheme.keyV.split('&')[0],
							secretKey,
							iv
						)
						const kalim = crypto.randomBytes(16).toString('hex')
						const token = generateSession + '#' + kalim
 						const session = new ClientSession({
							client: newClient._id,
							clientSessionToken: iv + '&' + token + '&' + secretKey,
							key: kalim,
						})
						console.log(`session oghli borda di`)
						console.table(session)
						await session.save()
						return token
					}
					const token = await generateTokenoghlo()
					res
						.setHeader(
							'Set-Cookie',
							`CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k=${token}; Max-Age=${
								60 * 60 * 24 * 7 * 22
							}; HttpOnly; Secure; SameSite=Strict; Path=/;`
						)
						.status(200)
						.json({ message: 'ثبت نام با موفقیت انجام شد', success: true })
				}
				//Forgot Password
			} else {
				res.status(407).json({
					message:
						'Authentication Type not in body of request , check Auth API',
				})
			}
		} else {
			res.status(409).json({ message: 'ttype of method is not correct' })
		}
	} catch (error) {
		console.error('Error :', error)
		res.status(500).json({ message: 'Server Error' })
	}
}

export default Register
