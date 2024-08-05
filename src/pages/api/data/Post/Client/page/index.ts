/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../models/Data/Product'
import db from '../../../../../../utils/index.js'
const Page = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { title, authType } = req.body
      if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
        await db.connectToShop()
        const product = await Product.findOne({ title })
        if (product) {
          const products = {
            ...product.toObject(),
            src: `/api/GET/products/${product.src}`,
            subImages: product.subImages.map(
              (sub: string) => `/api/GET/products/${sub}`
            ),
          }
          res.status(200).json({ success: true, products })
        } else {
          res.status(201)
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
