import { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../../../../models/Client'
import Profile from '../../../../../../models/Client/Profile'
import db from '../../../../../../utils'

const clients = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType } = req.body
      if (authType === '^c&L(i*e$N&t#o(x&a^') {
        await db.connect2DB()
        const clients = await Client.find({})
        const profiles = await Profile.find({})
        res.status(200).json({ clients, profiles })
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

export default clients
