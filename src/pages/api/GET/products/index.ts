// import { NextApiRequest, NextApiResponse } from 'next'
// import mongoose, { Connection, Document } from 'mongoose'
// import db from '../../../../utils/index.js'
// import Product from '../../../../models/Data/Product'
// import { ProductInterface } from '@/Interfaces/index.js'

// let gfs: mongoose.mongo.GridFSBucket | undefined

// const connectToDatabase = async () => {
//   if (!mongoose.connection.readyState) {
//     await db.connectToShop()
//   }
//   if (!gfs) {
//     gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//       bucketName: 'uploads',
//     })
//   }
// }

// const FindProduct = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.method === 'POST') {
//       const { authType, page, limit } = req.body
//       await connectToDatabase()

//       if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
//         const totalProducts = await Product.countDocuments({})
//         const skipCount = (page - 1) * limit
//         const products = (await Product.find({}, 'src title price description')
//           .skip(skipCount)
//           .limit(limit)) as (ProductInterface & Document)[]

//         const productsWithImageUrls = products.map((product) => ({
//           ...product.toObject(),
//           src: `/api/GET/products/${product._id}`,
//         }))

//         res.status(200).json({
//           success: true,
//           products: productsWithImageUrls,
//           totalProducts,
//         })
//       } else if (authType === '*k)a(L*i^M%a$s@o(t*A(l*') {
//         const totalProducts = await Product.countDocuments({})
//         res.status(200).json({ success: true, totalProducts })
//       } else {
//         res.status(407).json({ success: false, message: 'Invalid Auth Type' })
//       }
//     } else {
//       res.status(409).json({ success: false, message: 'Invalid Request Type' })
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: `Server Error => ${(err as Error).message}`,
//       })
//   }
// }

// export const config = {
//   api: {
//     responseLimit: '228mb',
//   },
// }

// export default FindProduct

// export const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToDatabase()

//     const { id } = req.query
//     if (!gfs) {
//       return res
//         .status(500)
//         .json({ success: false, message: 'GridFS not initialized' })
//     }

//     const files = await gfs
//       .find({ _id: new mongoose.Types.ObjectId(id as string) })
//       .toArray()

//     if (!files || files.length === 0) {
//       return res.status(404).json({ success: false, message: 'No file exists' })
//     }

//     const readstream = gfs.openDownloadStream(files[0]._id)
//     readstream.on('error', (streamErr) => {
//       res
//         .status(500)
//         .json({ success: false, message: `Stream error: ${streamErr.message}` })
//     })
//     res.setHeader(
//       'Content-Type',
//       files[0].contentType || 'application/octet-stream'
//     )
//     readstream.pipe(res)
//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: `Server Error => ${(err as Error).message}`,
//       })
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next'
import mongoose, { Document } from 'mongoose'
import db from '../../../../utils/index.js'
import Product from '../../../../models/Data/Product'
import { ProductInterface } from '@/Interfaces/index.js'

let gfs: mongoose.mongo.GridFSBucket | undefined

const connectToDatabase = async () => {
  if (!mongoose.connection.readyState) {
    await db.connectToShop()
  }
  if (!gfs) {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'uploads',
    })
  }
}

const FindProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, page, limit } = req.body
      await connectToDatabase()

      if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
        const totalProducts = await Product.countDocuments({})
        const skipCount = (page - 1) * limit
        const products = (await Product.find({}, 'src title price description')
          .skip(skipCount)
          .limit(limit)) as (ProductInterface & Document)[]

        const productsWithImageUrls = products.map((product) => ({
          ...product.toObject(),
          src: `/api/GET/products/${product._id}`,
        }))

        res.status(200).json({
          success: true,
          products: productsWithImageUrls,
          totalProducts,
        })
      } else if (authType === '*k)a(L*i^M%a$s@o(t*A(l*') {
        const totalProducts = await Product.countDocuments({})
        res.status(200).json({ success: true, totalProducts })
      } else {
        res.status(407).json({ success: false, message: 'Invalid Auth Type' })
      }
    } else {
      res.status(409).json({ success: false, message: 'Invalid Request Type' })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error => ${(err as Error).message}`,
    })
  }
}

export const config = {
  api: {
    responseLimit: '228mb',
  },
}

export default FindProduct

// import { NextApiRequest, NextApiResponse } from 'next'
// import db from '../../../../utils/index.js'
// import Product from '../../../../models/Data/Product'
// import { getImageBase64 } from '@/lib'

// const FindProduct = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.method === 'POST') {
//       const { authType, page, limit } = req.body
//       await db.connectToShop()
//       if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
//         const totalProducts = await Product.countDocuments({})

//         const skipCount = (page - 1) * limit

//         const products = await Product.find({}, 'src title price description')
//           .skip(skipCount)
//           .limit(limit)

//         const productsWithImages = await Promise.all(
//           products.map(async (product) => {
//             const srcBase64 = await getImageBase64(product.src)
//             return {
//               ...product.toObject(),
//               src: srcBase64,
//             }
//           })
//         )

//         if (page === 1) {
//           res
//             .status(200)
//             .json({ success: true, productsWithImages, totalProducts })
//         } else {
//           res.status(200).json({ success: true, products })
//         }
//       } else if (authType === '*k)a(L*i^M%a$s@o(t*A(l*') {
//         const totalProducts = await Product.countDocuments({})
//         res.status(200).json({ success: true, totalProducts })
//       } else {
//         res.status(407).json({ success: false, message: 'Invalid Auth Type' })
//       }
//     } else {
//       res.status(409).json({ success: false, message: 'Invalid Request Type' })
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: `Server Error => ${err}` })
//   }
// }
// export const config = {
//   api: {
//     responseLimit: '228mb',
//   },
// }
// export default FindProduct
