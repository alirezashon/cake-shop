/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Category from '../../../../../../models/Data/Category'
import db from '../../../../../../utils'
import mongoose from 'mongoose'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { aydi } = req.query
      const { authType, data, action } = req.body
      if (authType === '^c(a)t*E(T*t(A&g*o^x^o$s#m!') {
        await db.connect2DB()
        if (action === '(*I&n()s*e(r&t*^%t^O&n*E(') {
          const conn = mongoose.connection
          const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'images',
          })

          const imageBuffer = Buffer.from(data.src, 'base64')
          const uploadStream = bucket.openUploadStream('filename')

          uploadStream.write(imageBuffer)
          uploadStream.end()

          uploadStream.on('finish', async () => {
            const fileId = uploadStream.id.toString()
            await Category.create({ ...data, src: fileId })
            res.status(200).json({ success: true })
          })

          uploadStream.on('error', (err) => {
            res.status(500).json({ success: false, error: err.message })
          })
        } else if (action === ')U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(') {
          if (aydi && aydi.length > 0) {
            ;(await Category.findOneAndUpdate({ _id: aydi }, data))
              ? res.status(200).json({ success: true })
              : res.status(401).json({ success: false })
          } else {
            res.status(402).json({ success: false })
          }
        } else if (action === '&d*E%e#t&*^%s^waf#$^e$o%f@') {
          if (aydi && aydi.length > 0) {
            ;(await Category.findByIdAndDelete({ _id: aydi }, data))
              ? res.status(200).json({ success: true })
              : res.status(401).json({ success: false })
          } else {
            res.status(402).json({ success: false })
          }
        } else {
          res.status(405).json({ success: false })
        }
      } else {
        res.status(407).json({ success: false })
      }
    } else {
      res.status(409).json({ success: false })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
    console.log(err)
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '220mb',
    },
  },
}

export default cateBrand
