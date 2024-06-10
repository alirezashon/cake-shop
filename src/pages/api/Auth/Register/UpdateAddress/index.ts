/** @format */

import { NextApiRequest, NextApiResponse } from "next"
import Client from "../../../../../models/Client"
import ClientSession from "../../../../../models/Client/Session"
import db from "../../../../../utils"
import {
  generateKeyAndIV,
  encryptText,
} from "../../../../../Components/CryptoUtils"
import crypto from "crypto"
const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()
    if (req.method === "PUT") {
      const { phone, authType, houseNumber, houseUnit, address } = req.body
      console.log(req.body)

      //Update address
      if (authType === "C%L&i*c(h&a*k^a&d%d^r@i#R") {
        const userSchema = await Client.findOne({ phone })
        if (userSchema) {
          const updateData = {
            information: {
              address,
              houseNumber,
              houseUnit,
              zipCode: 7,
            },
          }

          const updatedUser = await Client.findOneAndUpdate(
            { phone },
            { $set: updateData },
            { new: true }
          )

          if (updatedUser) {
            res.status(200).json({
              message: "اطلاعات با موفقیت به‌روزرسانی شد",
              success: true,
            })
          } else {
            res.status(500).json({
              message: "به‌روزرسانی اطلاعات کاربر با شکست مواجه شد",
              success: false,
            })
          }
        }
      } else {
        res.status(404).json({ message: "کاربر یافت نشد", success: false })
      }
    } else {
      res
        .status(400)
        .json({ message: "نوع اعتبار نامعتبر است", success: false })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "خطای سرور", success: false })
  }
}

export default Register
