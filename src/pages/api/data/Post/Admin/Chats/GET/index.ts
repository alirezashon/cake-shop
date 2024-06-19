/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Chat from '../../../../../../../models/Chat'
import db from '../../../../../../../utils'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType } = req.body
      if (authType === '&c*h^A%t$m^a#t%o$k@a!l&i^') {
        await db.connect2DB()
        const chats = await Chat.find({})
        res.status(200).json({ chats })
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
