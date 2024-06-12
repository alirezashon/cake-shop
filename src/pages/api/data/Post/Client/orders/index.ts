import { NextApiRequest, NextApiResponse } from "next"
import Orders from "../../../../../../models/Orders"
import ClientSession from "../../../../../../models/Client/Session"
import Client from "../../../../../../models/Client"
import Product from "../../../../../../models/Data/Product"
import db from "../../../../../../utils/index.js"
import { ClientInterface } from "@/DTO"
const orderero = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { authType } = req.body
      const token = req.cookies["CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k"]

      if (authType === "(k*i)o&R^D&e$r#o@l!A$n%S*o(7)") {
        await db.connectToShop()
        const kalim = token && token.split("#")[1].replace(/"$/, "")
        const session = await ClientSession.findOne({
          key: kalim,
        })
        if (session && session.key === kalim) {
          const clientSchema: ClientInterface | null = await Client.findOne({
            _id: session.client,
          })
          if (clientSchema) {
            const clientDatashow = {
              info: {
                email: clientSchema.email || "",
                name: clientSchema.name || "",
                nationalCode: clientSchema.nationalCode || "",
                phone: clientSchema.phone || -1,
              },
              addr: clientSchema.information.map((client) => {
                return { 
                  address: client.address || "",
                  zipCode: client.zipCode || -1,
                  houseUnit: client.houseUnit || -1,
                  houseNumber: client.houseNumber || -1,
                }
              }),
            }
            const orders =
              clientSchema &&
              (await Orders.find(
                { client: session.client },
                {
                  _id: 0,
                  ticketID: 1,
                  status: 1,
                  client: 1,
                  products: 1,
                  totalPrice: 1,
                  attachment: 1,
                }
              ).catch((error) =>
                console.error("Error fetching orders:", error)
              ))
            if (orders)
              for (const order of orders) {
                const productIds = order.products // Assuming order.products is an array of product IDs
                const products = await Product.find({
                  _id: { $in: productIds },
                })
                order.products = products
              }
            res.status(200).json({ success: true, orders, clientDatashow })
          }
        } else {
          res
            .status(207)
            .json({ success: false, message: "session is expired" })
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
export default orderero
