/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../models/Data/Product/index'
import db from '../../../../../../utils/index.js'
import { ProductInterface } from '@/Interfaces'
const Page = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { id, comment, authType } = req.body
      if (authType === '(a&D*m%o$t^C@e$n%t(A)m)') {
        await db.connectToShop()
        const products: ProductInterface | null = await Product.findOne({
          _id: id,
        })
        if (products) {
          const updated = products
          updated.comments = [...updated.comments, comment]
          await Product.findOneAndUpdate({ _id:id },updated)
          res.status(200).json({ success: true, products })
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
export default Page
