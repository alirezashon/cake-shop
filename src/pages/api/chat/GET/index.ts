/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Chat from '../../../../models/Chat'
import Client from '@/models/Client'
import ClientSession from '@/models/Client/Session'
const getit = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType, client } = req.body
			const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']

			if (authType === '!C#o$N%e^C&t*O$C#h$t%') {
				const kalim = token && token.split('#')[1].replace(/"$/, '')
				const session = await ClientSession.findOne({
					key: kalim,
				})
				if (session && session.key === kalim) {
					const clientSchema = await Client.findOne({
						_id: session.client,
					})
					if (clientSchema) {
						const messages = await Chat.find({
							client: session.client,
							time: -1,
						})
						const responses = await Chat.find({
							client: session.client,
							_id: `${client}`,
						})
						res.status(200).json({ messages, responses, success: true })
					}
				} else {
					res
						.status(207)
						.json({ success: false, message: 'session is expired' })
				}
			} else if (authType === '&n)E(w*o&n$e^w#q@') {
				const messages = await Chat.find({
					client: client,
				})
				res.status(200).json({ messages, success: true })
			} else {
				res.status(407).json({ message: 'Invalid auth type', success: false })
			}
		} else {
			res.status(409).json({ message: 'Invalid method', success: false })
		}
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error })
	}
}
export default getit
