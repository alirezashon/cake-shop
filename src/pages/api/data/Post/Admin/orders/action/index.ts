/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import AdminSession from '../../../../../../../models/Admin/Session'
import db from '../../../../../../../utils/index.js'
import Order from '../../../../../../../models/Orders'

const action = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, status, id } = req.body
      const token = req.cookies['*a&D^d%d$D^M#i@m$M$i#n%i&a*m(o)kne3ykN2y@x']

      if (authType === 'n(k*i)o*a(f&h*k%y$w$q#a7)') {
        await db.connectToShop()
        const kalim = token && token.split('#')[1].replace(/"$/, '')
        const session = await AdminSession.findOne({
          key: kalim,
        })
        if (session && session.key === kalim) {
          const newOrder = await Order.findOne({ ticketID: id })
          newOrder.status = status
          if (newOrder) {
            await Order.findOneAndUpdate({ _id: newOrder._id }, newOrder)
            res.status(200).json({ success: true })
          }
        } else {
          res
            .status(207)
            .json({ success: false, message: 'session is expired' })
        }
      } else {
        res.status(407).json({ success: false, message: 'Invalid Auth Type' })
      }
    } else {
      res.status(409).json({ success: false, message: 'Invalid Request Type' })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}
export default action