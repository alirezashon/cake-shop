import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../../models/Data/Product'
import Category from '../../../../../../../models/Data/Category'
import db from '../../../../../../../utils'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType } = req.body
      if (authType === '^c(a)ta*sEa0c(Tzol&i^*o%l#sA!') {
        await db.connect2DB()
        const category = await Category.find({})
        res.status(200).json({ category })
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
