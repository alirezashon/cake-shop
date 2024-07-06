import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../utils/index.js'
import Product from '../../../../models/Data/Product'

const FindProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
     if (req.method === 'POST') {
      const { authType, page, limit} = req.body
      if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
        await db.connectToShop()

        const totalProducts = await Product.countDocuments({})

        const skipCount = (page - 1) * limit

        const products = await Product.find({},'src title price description').skip(skipCount).limit(limit)
        console.log(totalProducts)
        console.log(req.body)
        if (page === 1) {
          res.status(200).json({ success: true, products, totalProducts })
        } else {
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
export const config = {
  api: {
    responseLimit: '228mb',
  },
}
export default FindProduct
