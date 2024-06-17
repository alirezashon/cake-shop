/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils'
import Message from '../../../models/Chat'
const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, message, client } = req.body
      console.log(req.body)
      if (authType === '&M%e$A#g$e#I%n&Z*') {
        await db.connectToShop()
        await Message.create({
          client,
          content: message,
          sender: '*u&$e#',
        })
          .then(() => res.status(200).json({ success: true }))
          .catch(() => res.status(201).json({ success: false }))
      }
    } else {
      res.status(409).json({ success: false, message: 'bad method' })
    }
  } catch (err) {
    res.status(500).json({ message: `Server Error => ${err}` })
  }
}
export default chat
