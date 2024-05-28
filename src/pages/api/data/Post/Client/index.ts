/** @format */

import { NextApiRequest, NextApiResponse } from "next"
import Product from "../../../../../models/Data/Product"
import db from "../../../../../utils/index.js"
import Brand from "../../../../../models/Data/Types"
import Category from "../../../../../models/Data/Category"
import Carousel from "../../../../../models/Data/Carousel"
const FindCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { category, authType } = req.body
      if (authType === "G&E!T*P^R$O#D$U^C@T*S") {
        await db.connectToShop()
        if (category === "@L$L%O%F#D%M^") {
          const products = await Product.find({})
          const brands = await Brand.find({})
          const categories = await Category.find({})
          const carousel = await Carousel.find({})
          res
            .status(200)
            .json({ success: true, products, brands, categories, carousel })
        } else if (category.split("rAz")[0] === "@L$L%O%F#D%M^") {
          console.log(category.split("rAz"))
          const products = await Product.find({
            categories: [category.split("rAz")[1]],
          })
          res.status(200).json({ success: true, products })
        } else if (category.split("rAz")[1] === "@L$L%O%F#D%M^") {
          console.log(category.split("rAz"))
          const products = await Product.find({
            brand: [category.split("rAz")[0]],
          })
          res.status(200).json({ success: true, products })
        } else {
          const products = await Product.findOne({ category })
          res.status(200).json({ success: true, products })
        }
      } else {
        res.status(407).json({ success: false, message: "Invalid Auth Type" })
      }
    } else {
      res.status(409).json({ success: false, message: "Invalid Request Type" })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}
export default FindCategory
export const config = {
	api: {
		bodyParser: {
			sizeLimit: '100mb',
		},
	},
}
