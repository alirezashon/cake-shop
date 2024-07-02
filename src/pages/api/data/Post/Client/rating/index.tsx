/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../models/Data/Product'
import db from '../../../../../../utils/index.js'
import { ProductInterface } from '@/Interfaces'
const Page = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { id, rate, authType } = req.body
      if (authType === '*a)s*o&t(a^r*t@e!e$') {
        await db.connectToShop()
        const products: ProductInterface | null = await Product.findOne({
          _id: id,
        })

        if (products) {
          const updated = products
          updated.rates = (products.rates + rate) / 2
          await Product.findByIdAndUpdate({ id, updated })
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
