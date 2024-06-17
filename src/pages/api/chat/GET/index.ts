import { NextApiRequest, NextApiResponse } from 'next'
import Chat from '../../../../models/Chat'
import ClientSession from '@/models/Client/Session'
const getit = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType } = req.body
      const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']

      if (authType === '!C#o$N%e^C&t*O$C#h$t%') {
        const kalim = token && token.split('#')[1].replace(/"$/, '')
        const session = await ClientSession.findOne({
          key: kalim,
        })
        if (session && session.key === kalim) {
          const messages = await Chat.find({
            client: session.client,
            time: -1,
          })

          res.status(200).json({ messages })
        } else {
          res
            .status(207)
            .json({ success: false, user: `custom user ${new Date()}` })
        }
      } else {
        res.status(407).json({ message: 'Invalid auth type', success: false })
      }
    } else {
      res.status(409).json({ message: 'Invalid method', success: false })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error })
  }
}
export default getit
