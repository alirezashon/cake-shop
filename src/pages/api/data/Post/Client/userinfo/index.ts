/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../../../../models/Client'
import db from '../../../../../../utils'
import ClientSession from '@/models/Client/Session'
import Profile from '@/models/Client/Profile'

const userinfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, email, name, nationalCode } = req.body
      const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
      if (authType === 'C%L&i&E^ne^D%A$UtR') {
        await db.connectToShop()
        const kalim = token && token.split('#')[1].replace(/"$/, '')
        const session = await ClientSession.findOne({
          key: kalim,
        })
        if (session && session.key === kalim) {
          const userSchema = await Profile.findOne({ client: session.client })
          console.log(session)

          if (userSchema) {
            const updateData = {
              ...(email ? { email } : userSchema.email),
              ...(name ? { name } : userSchema.name),
              ...(nationalCode ? { nationalCode } : userSchema.nationalCode),
            }
            if (!email && !name && !nationalCode) {
              delete updateData.information
            }
            console.log(userSchema)

            // Update user in the database
            const updatedUser = await Profile.findByIdAndUpdate(
              userSchema._id,
              { $set: updateData },
              { new: true }
            )

            res.status(200).json({
              message: 'با موفقیت انجام شد',

              success: true,
              updatedUser,
            })
          } else {
            res.status(209).json({
              message: 'نام کاربری موجود نمی باشد',
              success: false,
            })
          }
        } else {
          res
            .status(207)
            .json({ success: false, message: 'session is expired' })
        }
      } else {
        res.status(407).json({
          message: 'Authentication Type not in body of request, check Auth API',
        })
      }
    } // else if (req.method === 'PUT') {
    //   const { authType, information } = req.body
    //   const token = req.cookies['CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k']
    //   if (authType === 'C%L&i&E^ne^D%A$UtR') {
    //     await db.connectToShop()
    //     const kalim = token && token.split('#')[1].replace(/"$/, '')
    //     const session = await ClientSession.findOne({
    //       key: kalim,
    //     })
    //     if (session && session.key === kalim) {
    //       const userSchema: ClientInterface | null = await Client.findOne({
    //         _id: session.client,
    //       })

    //       if (userSchema) {
    //         const updateData = {
    //           email: userSchema.email,
    //           name: userSchema.name,
    //           nationalCode: userSchema.nationalCode,
    //           phone: userSchema.phone,
    //           password: userSchema.password,
    //           information,
    //           time: userSchema.time,
    //           keyV: userSchema.keyV,
    //         }

    //         if (!information) {
    //           delete updateData.information
    //         }

    //         // Update user in the database
    //         ;(await Client.findOneAndUpdate(
    //           { _id: userSchema._id },
    //           updateData
    //         ))
    //           ? res.status(200).json({ success: true })
    //           : res.status(201).json({ success: false })
    //       } else {
    //         res.status(209).json({
    //           message: 'نام کاربری موجود نمی باشد',
    //           success: false,
    //         })
    //       }
    //     } else {
    //       res
    //         .status(207)
    //         .json({ success: false, message: 'session is expired' })
    //     }
    //   } else {
    //     res.status(407).json({
    //       message: 'Authentication Type not in body of request, check Auth API',
    //     })
    //   }
    // }
    else {
      res.status(409).json({ message: 'Type of method is not correct' })
    }
  } catch (error) {
    console.error('Error :', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default userinfo
