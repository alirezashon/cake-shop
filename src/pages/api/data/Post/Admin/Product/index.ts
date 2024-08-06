import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../models/Data/Product'
import db from '../../../../../../utils'
import mongoose from 'mongoose'

const cateBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { aydi } = req.query
      const { authType, data, action } = req.body

      if (authType === '^c(a)t*E(Tso^soalsgfs^$#m!') {
        await db.connect2DB()

        const conn = mongoose.connection
        const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'images',
        })

        const uploadImage = async (
          imageBase64: string,
          filename: string
        ): Promise<string> => {
          return new Promise((resolve, reject) => {
            const imageBuffer = Buffer.from(imageBase64, 'base64')
            const uploadStream = bucket.openUploadStream(filename)

            uploadStream.write(imageBuffer)
            uploadStream.end()

            uploadStream.on('finish', () =>
              resolve(uploadStream.id.toString())
            )
            uploadStream.on('error', (err) => reject(err))
          })
        }

        if (action === '(*I&n()s*e(r&t*^%t^O&n*E(') {
          const mainImageId: string = await uploadImage(data.src, 'mainImage')

          const subImageIds: string[] = await Promise.all(
            data.subImages.map((subImage: any, index: number) =>
              uploadImage(subImage, `subImage${index + 1}`)
            )
          )

          await Product.create({
            ...data,
            src: mainImageId,
            subImages: subImageIds,
          })

          res.status(200).json({ success: true })
        } else if (action === ')U*p)d(sa@!$!2s1!23r2%a$t#e@i*n(') {
          if (aydi && aydi.length > 0) {
            const mainImageId: string = await uploadImage(data.src, 'mainImage')

            const subImageIds: string[] = await Promise.all(
              data.subImages.map((subImage: any, index: number) =>
                uploadImage(subImage, `subImage${index + 1}`)
              )
            )

            const updateData = {
              ...data,
              src: mainImageId,
              subImages: subImageIds,
            }

            await Product.findOneAndUpdate({ _id: aydi }, updateData)
              ? res.status(200).json({ success: true })
              : res.status(401).json({ success: false })
          } else {
            res.status(402).json({ success: false })
          }
        } else if (action === '&d*E%e#t&*^%s^waf#$^e$o%f@') {
          if (aydi && aydi.length > 0) {
            await Product.findByIdAndDelete(aydi)
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
    res.status(500).json({ success: false })
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
