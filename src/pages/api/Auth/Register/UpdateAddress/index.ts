import { NextApiRequest, NextApiResponse } from "next"
import Client from "../../../../../models/Client"
import ClientSession from "../../../../../models/Client/Session"
import db from "../../../../../utils"
import { decryptText } from "../../../../../Components/CryptoUtils"

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies["CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k"]
    const { authType, houseNumber, houseUnit, address } = req.body
    await db.connect2DB()
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided", success: false })
    }

    const kalim = token.split("#")[1].replace(/"$/, "")
    const session = await ClientSession.findOne({ key: kalim })

    if (!session || session.key !== kalim) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid session", success: false })
    }
    console.log(session)
    const decryptedPassword = decryptText(
      token.split("#")[0].replace(/^"/, ""),
      session.clientSessionToken.split("&")[2],
      session.clientSessionToken.split("&")[0]
    )

    const clientSchema = await Client.findOne({ _id: session.client })
    const validatePass =
      decryptedPassword.split("%")[1] + "&" + decryptedPassword.split("%")[0]
    if (clientSchema.keyV !== validatePass) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Password mismatch", success: false })
    }

    if (authType !== "C%L&i*c(h&a*k^a&d%d^r@i#R") {
      return res
        .status(400)
        .json({ message: "Invalid authType", success: false })
    }

    const userSchema = await Client.findOne({ phone: clientSchema.phone })
    if (!userSchema) {
      return res.status(404).json({ message: "User not found", success: false })
    }

    const updateData = {
      information: {
        address,
        houseNumber,
        houseUnit,
        zipCode: 7,
      },
    }

    const updatedUser = await Client.findOneAndUpdate(
      { _id: userSchema._id },
      updateData,
    )

    if (!updatedUser) {
      return res
        .status(500)
        .json({ message: "Failed to update user", success: false })
    }

    res
      .status(200)
      .json({ message: "Information updated successfully", success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", success: false })
  }
}

export default Register
