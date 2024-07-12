import mongoose from 'mongoose'
import db from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

 const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Image' },
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()

    const imageDir = path.resolve('D:\\personal\\ax\\producto\\ziada')
    const images = fs.readdirSync(imageDir)

    const conn = mongoose.connection
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images',
    })

    const uploadImage = (image: string): Promise<mongoose.Types.ObjectId> => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(imageDir, image)
        const readStream = fs.createReadStream(filePath)
        const uploadStream = bucket.openUploadStream(image)
        readStream
          .pipe(uploadStream)
          .on('error', (error) => reject(error))
          .on('finish', () =>
            resolve(uploadStream.id as mongoose.Types.ObjectId)
          )
      })
    }

    const data = await Promise.all(
      images.map(async (image) => {
        const fileId = await uploadImage(image)
        await Product.create({
          title: 'کیک',
          src: fileId,
        })
      })
    )

    res.status(200).json({
      success: true,
      message: 'Products inserted successfully',
    })
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}

export default Shop
