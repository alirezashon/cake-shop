import Tools from "@/models/Tools"
import db from "@/utils"
import { NextApiRequest, NextApiResponse } from "next"
const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.cookies["CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k"])
    await db.connect2DB()
    const data = [
      {
        name: "موز",
        price: 80000,
        src: Buffer.from("/omage/موز.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "میوه",
      },
      {
        name: "گردو",
        price: 280000,
        src: Buffer.from("/omage/گردو.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "آجیل",
      },
      {
        name: "شکلات",
        price: 120000,
        src: Buffer.from("/omage/شکلات.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "پودر",
      },
      {
        name: "فوندانت",
        price: 70000,
        src: Buffer.from("/omage/فوندانت.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "خمیر",
      },
      {
        name: "کرمفیل",
        price: 170000,
        src: Buffer.from("/omage/کرمفیل.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "کرم",
      },
      {
        name: "شکر قهوه ای",
        price: 110000,
        src: Buffer.from("/omage/شکر قهوه ای.jpg", "base64")
          .toString("base64")
          .split(",")[1],
        tag: "شیرینی",
      },
    ]
    
    data.filter( async(d) => await Tools.create(d))
    res.status(200).json({
      success: true,
    })
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}
export default Shop
