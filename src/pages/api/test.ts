import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import db from '@/utils'
import Product from '@/models/Data/Product'

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()
    const conn = mongoose.connection
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images',
    })

    const products = await Product.find().exec()
    console.log(products)
    const getImageBase64 = (id: mongoose.Types.ObjectId): Promise<string> => {
      return new Promise((resolve, reject) => {
        const bufferChunks: Buffer[] = []
        bucket
          .openDownloadStream(id)
          .on('data', (chunk) => bufferChunks.push(chunk))
          .on('error', (error) => reject(error))
          .on('end', () => {
            const buffer = Buffer.concat(bufferChunks)
            resolve(buffer.toString('base64'))
          })
      })
    }

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const srcBase64 = await getImageBase64(product.src)
        const subImagesBase64 = await Promise.all(
          product.subImages.map(async (subImage: any) => {
            const subImageBase64 = await getImageBase64(subImage)
            return subImageBase64
          })
        )
        console.log(srcBase64)
        return {
          ...product.toObject(),
          src: srcBase64,
          subImages: subImagesBase64,
        }
      })
    )

    res.status(200).json({ success: true, data: productsWithImages })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: `Server Error => ${error}` })
  }
}

export default getProducts
