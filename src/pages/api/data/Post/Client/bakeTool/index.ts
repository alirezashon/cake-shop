/** @format */

import { NextApiRequest, NextApiResponse } from "next"
import Tools from "../../../../../../models/Tools"
import db from "../../../../../../utils"
import Tags from "@/models/Tools/Tags"

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { authType } = req.body
      if (authType === "^c(a)ta*sEa0c(Tzol&i^*o%l#sA!") {
        await db.connectToShop()
        const tools = await Tools.find({})
        const tags = await Tags.find({})
        res.status(200).json({ tools,tags })
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
