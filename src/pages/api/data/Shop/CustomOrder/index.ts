/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import CustomOrder from '@/models/Orders/CustomOrder'
import db from '../../../../../utils/index.js'
import ClientSession from '../../../../../models/Client/Session'
import Client from '../../../../../models/Client'
 const createCustomOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { details, attachment, address, authType } = req.body
      const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
      if (authType === 'S&_(3(o)7*ama&x(f#T^I@M*E') {
        if (details) {
          await db.connect2DB()
          const kalim = token && token.split('#')[1].replace(/"$/, '')
          const session = await ClientSession.findOne({
            key: kalim,
          })
          if (session && session.key === kalim) {
            const clientSchema = await Client.findOne({ _id: session.client })
            if (clientSchema) {
              const order = {
                status: 'InProgress',
                address,
                client: session.client,
                details,
                attachment,
              }
              console.log(order)
              const newOrder = new CustomOrder(order)
              await newOrder.save()
              res.status(200).json({ success: true })
            }
          } else {
            res
              .status(207)
              .json({ success: false, message: 'session is expired' })
          }
        } else {
          res.status(406).json({ success: false, message: 'Basket is Empty' })
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
export default createCustomOrder
