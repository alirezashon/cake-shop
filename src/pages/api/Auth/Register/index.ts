import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import ClientSession from '../../../../models/Client/Session'
import Client from '../../../../models/Client'
import Profile from '../../../../models/Client/Profile'
import db from '../../../../utils/index.js'
const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, token } = req.body
      if (authType === 'ClIeNt_ValidaTe*%') {
        if (token) {
          await db.connectToShop()
          const kalim = token.split('#')[1].replace(/"$/, '')
          const session = await ClientSession.findOne({
            key: kalim,
          })
          if (session && session.key === kalim) {
            const clientSchema = await Client.findOne({ _id: session.client })
            if (clientSchema) {
              const profileSchema = await Profile.findOne({
                client: clientSchema._id,
              })
              if (profileSchema.information[0]) {
                NextResponse.redirect(new URL('/newReq/pay', req.url))
                res.status(212).json({
                  success: false,
                })
              } else {
                NextResponse.redirect(new URL('/address', req.url))
                res.status(210).json({
                  success: false,
                })
              }
            } else {
              NextResponse.redirect(new URL('/Login', req.url))
              res.status(211).json({
                success: false,
              })
            }
          } else {
            res.status(207).json({
              success: false,
              message: 'نشست کاربری شما پایان یافته است',
            })
          }
        } else {
          NextResponse.redirect(new URL('/Login', req.url))
          res.status(211).json({
            success: false,
          })
        }
      } else {
        res.status(407).json({ success: false, message: 'Invalid auth type' })
      }
    } else {
      res.status(409).json({ success: false, message: 'Invalid method' })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}
export default Register
