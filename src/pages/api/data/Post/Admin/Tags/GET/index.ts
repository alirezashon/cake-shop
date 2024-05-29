/** @format */

import { NextApiRequest, NextApiResponse } from "next"
import Tags from "../../../../../../../models/Tools/Tags"
import db from "../../../../../../../utils"

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { authType } = req.body
      if (authType === "^c(a)ta*sEa)*(t)A&g^o%s#x%sA!") {
        await db.connectToShop()
        const tags = await Tags.find({})
        res.status(200).json({ tags })
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
