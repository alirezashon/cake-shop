import { NextApiRequest, NextApiResponse } from 'next'
import ClientSession from '../../../../../models/Client/Session'
import db from '../../../../../utils'
import Profile from '@/models/Client/Profile'

const InsertAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ message: 'Method not allowed', success: false })
    }

    const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
    const { authType, information } = req.body
    console.log(information)
    await db.connect2DB()
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided', success: false })
    }

    const kalim = token.split('#')[1].replace(/"$/, '')
    const session = await ClientSession.findOne({ key: kalim })

    if (!session || session.key !== kalim) {
      return res.status(401).json({ success: false })
    }

    if (authType !== 'C%a&d*s$r)e(k^xa&d%d^r@i#R') {
      return res
        .status(400)
        .json({ message: 'Invalid authType', success: false })
    }

    const clientProfile = await Profile.findOne({ client: session.client })
    if (!clientProfile) {
      return res.status(402).json({ success: false })
    }
    const updatedData = {
      email: clientProfile.email,
      name: clientProfile.name,
      nationalCode: clientProfile.na,
      information: [...clientProfile.information, information],
      favorites: clientProfile.favorites,
      seens: clientProfile.seens,
      time: clientProfile.time,
    }
    ;(await Profile.findOneAndUpdate({ _id: clientProfile._id }, updatedData))
      ? res.status(200).json({ success: true })
      : res.status(201).json({ success: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', success: false })
  }
}

export default InsertAddress
