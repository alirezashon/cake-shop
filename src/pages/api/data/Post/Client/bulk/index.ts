import { NextApiRequest, NextApiResponse } from 'next'
import Product from '../../../../../../models/Data/Product'
import db from '../../../../../../utils/index.js'
import mongoose from 'mongoose'
interface CustomGridFSBucketReadStreamOptions
  extends mongoose.mongo.GridFSBucketReadStreamOptions {
  bufferSize?: number
}
const Bulk = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { bulkID, authType } = req.body
      if (authType === 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$') {
        await db.connectToShop()
        const products = await Product.find({ _id: { $in: bulkID } })

        const conn = mongoose.connection
        const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
          bucketName: 'images',
        })

        const imageCache = new Map<string, string>()

        const getImageBase64 = async (
          id: mongoose.Types.ObjectId
        ): Promise<string> => {
          if (imageCache.has(id.toHexString())) {
            return imageCache.get(id.toHexString())!
          }

          return new Promise((resolve, reject) => {
            const bufferChunks: Buffer[] = []
            const options: CustomGridFSBucketReadStreamOptions = {
              bufferSize: 1024 * 1024,
            }

            bucket
              .openDownloadStream(id, options)
              .on('data', (chunk) => bufferChunks.push(chunk))
              .on('error', (error) => reject(error))
              .on('end', () => {
                const buffer = Buffer.concat(bufferChunks)
                const base64 = buffer.toString('base64')
                imageCache.set(id.toHexString(), base64)
                resolve(base64)
              })
          })
        }

        // Convert products in parallel
        const ConvertedProducts = await Promise.all(
          products.map(async (product) => {
            const srcBase64 = await getImageBase64(product.src)
            return {
              ...product.toObject(),
              src: srcBase64,
            }
          })
        )

        res.status(200).json({ success: true, ConvertedProducts })
      } else {
        res.status(407).json({ success: false, message: 'Invalid Auth Type' })
      }
    } else {
      res.status(409).json({ success: false, message: 'Invalid Request Type' })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}

export default Bulk
