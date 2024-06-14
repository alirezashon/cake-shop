/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import ClientSession from '../../../../../../../../models/Client/Session'
import db from '../../../../../../../../utils'
import Profile from '@/models/Client/Profile'
import { Information } from '@/Interfaces'

const removeAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const { authType, id } = req.body

      if (authType === 'C%a&d&u*P(A)d*t$e#w%o^p&ama*7137^r@i#R') {
        const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']

        if (!token) {
          res
            .status(401)
            .json({
              message: 'Unauthorized: No token provided',
              success: false,
            })
          return
        }

        const kalim = token.split('#')[1].replace(/"$/, '')
        await db.connect2DB()
        const session = await ClientSession.findOne({ key: kalim })

        if (!session || session.key !== kalim) {
          res.status(401).json({ success: false })
          return
        }

        const clientProfile = await Profile.findOne({ client: session.client })
        if (!clientProfile) {
          res.status(402).json({ success: false })
          return
        }
console.table(clientProfile.information[2])
        const updatedInformation = clientProfile.information.filter(
          (addr: Information) => addr?._id?.toString() !== id
        )

        const updatedData = {
          email: clientProfile.email,
          name: clientProfile.name,
          nationalCode: clientProfile.nationalCode,
          information: updatedInformation,
          favorites: clientProfile.favorites,
          seens: clientProfile.seens,
          time: clientProfile.time,
        }
        console.table(updatedInformation)
        console.table(updatedData)
        const result = await Profile.findOneAndUpdate(
          { _id: clientProfile._id },
          updatedData,
          { new: true }
        )

        if (result) {
          res.status(200).json({ success: true })
        } else {
          res.status(500).json({ success: false, message: 'Update failed' })
        }
      } else {
        res.status(400).json({ success: false, message: 'Invalid Auth Type' })
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ success: false, message: `Server Error => ${error}` })
  }
}

export default removeAddress
