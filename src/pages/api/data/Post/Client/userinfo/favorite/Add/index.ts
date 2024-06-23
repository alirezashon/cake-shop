import { NextApiRequest, NextApiResponse } from 'next'
import ClientSession from '../../../../../../../../models/Client/Session'
import db from '../../../../../../../../utils'
import Profile from '@/models/Client/Profile'

const updateAddress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ message: 'Method not allowed', success: false })
    }

    const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
    const { authType, favorites } = req.body
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

    if (authType !== '%a&d*v*a(e)t(q^g%p%s$a%g@i#') {
      return res
        .status(400)
        .json({ message: 'Invalid authType', success: false })
    }

    const clientProfile = await Profile.findOne({ client: session.client })
    if (!clientProfile) {
      return res
        .setHeader(
          'Set-Cookie',
          `CFwrx=${req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']&& req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']+'(p&$l$i#e)r(t'+favorites}; Max-Age=${
            60 * 60 * 7 * 22222
          }; HttpOnly; Secure; SameSite=Strict; Path=/;`
        )
        .status(402)
        .json({ success: false })
    }

    ;(await Profile.findOneAndUpdate(
      { client: clientProfile._id },
      {
        favorites: [...clientProfile.favorites, favorites],
      }
    ))
      ? res.status(200).json({ success: true })
      : res.status(201).json({ success: false })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', success: false })
  }
}

export default updateAddress
