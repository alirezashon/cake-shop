
import { NextApiRequest, NextApiResponse } from 'next'
import Profile from '../../../../../../../models/Client/Profile'
import db from '../../../../../../../utils'
import Client from '@/models/Client'

const details = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType,id } = req.body
      if (authType === '^c#p$r%0#f%a^') {
        await db.connect2DB()
        const profile = await Client.findOne({client:id})
        res.status(200).json({ profile })
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

export default details
