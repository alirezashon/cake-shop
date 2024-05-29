/** @format */

import { NextApiRequest, NextApiResponse } from "next"
import Tags from "../../../../../../models/Tools/Tags"
import db from "../../../../../../utils"

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { aydi } = req.query
      const { authType, data, action } = req.body
      if (authType === "^c(a)t*E(T*t(A&g*o^x^o$s#m!") {
        await db.connectToShop()
        if (action === "(*I&n()s*e(r&t*^%t^O&n*E(") {
          await Tags.create(data)
          res.status(200).json({ success: true })
        } else if (action === ")U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(") {
          if (aydi && aydi.length > 0) {
            ;(await Tags.findOneAndUpdate({ _id: aydi }, data))
              ? res.status(200).json({ success: true })
              : res.status(401).json({ success: false })
          } else {
            res.status(402).json({ success: false })
          }
        } else if (action === "&d*E%e#t&*^%s^waf#$^e$o%f@") {
          if (aydi && aydi.length > 0) {
            ;(await Tags.findByIdAndDelete({ _id: aydi }, data))
              ? res.status(200).json({ success: true })
              : res.status(401).json({ success: false })
          } else {
            res.status(402).json({ success: false })
          }
        } else {
          res.status(405).json({ success: false })
        }
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
