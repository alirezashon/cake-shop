import { NextApiRequest, NextApiResponse } from 'next'
import ClientSession from '../../../../models/Client/Session'
import Client from '../../../../models/Client'
import Profile from '../../../../models/Client/Profile'
import db from '../../../../utils/index.js'
import { Information } from '@/Interfaces'

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType } = req.body
      const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']

      if (authType === '*v(a&l^8$b#y@t%o*l(x*k)p') {
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
                const addresses = profileSchema.information.map(
                  (addr: Information) => addr.address
                )
                res.status(200).json({
                  information:addresses,
                  Location: '/newReq/pay',
                })
              } else {
                res
                  .writeHead(302, { Location: 'newReq/address' })
                  .status(210)
                  .json({
                    success: false,
                  })
              }
            } else {
              res.status(211).json({
                success: false,
                Location: '/Login',
              })
            }
          } else {
            res.status(207).json({
              success: false,
              message: 'نشست کاربری شما پایان یافته است',
            })
          }
        } else {
          res.status(211).json({
            success: false,
            Location: '/Login',
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

// import { NextApiRequest, NextApiResponse } from 'next'
// import { NextResponse } from 'next/server'
// import ClientSession from '../../../../models/Client/Session'
// import Client from '../../../../models/Client'
// import Profile from '../../../../models/Client/Profile'
// import db from '../../../../utils/index.js'
// const Register = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.method === 'POST') {
//       const { authType } = req.body
//       const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
//       if (authType === '*v(a&l^8$b#y@t%o*l(x*k)p') {
//         if (token) {
//           await db.connectToShop()
//           const kalim = token.split('#')[1].replace(/"$/, '')
//           const session = await ClientSession.findOne({
//             key: kalim,
//           })
//           if (session && session.key === kalim) {
//             const clientSchema = await Client.findOne({ _id: session.client })
//             if (clientSchema) {
//               const profileSchema = await Profile.findOne({
//                 client: clientSchema._id,
//               })
//               console.log(profileSchema)
//               if (profileSchema.information[0]) {
//                 NextResponse.redirect(new URL('/newReq/pay', req.url))
//                 res.status(200).json({
//                   information: profileSchema.information,
//                 })
//               } else {
//                 NextResponse.redirect(new URL('newReq/address', req.url))
//                 res.status(210).json({
//                   success: false,
//                 })
//               }
//             } else {
//               NextResponse.redirect(new URL('/Login', req.url))
//               res.status(211).json({
//                 success: false,
//               })
//             }
//           } else {
//             res.status(207).json({
//               success: false,
//               message: 'نشست کاربری شما پایان یافته است',
//             })
//           }
//         } else {
//           NextResponse.redirect(new URL('/Login', req.url))
//           res.status(211).json({
//             success: false,
//           })
//         }
//       } else {
//         res.status(407).json({ success: false, message: 'Invalid auth type' })
//       }
//     } else {
//       res.status(409).json({ success: false, message: 'Invalid method' })
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: `Server Error => ${err}` })
//   }
// }
// export default Register
