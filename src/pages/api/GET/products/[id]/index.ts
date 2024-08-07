import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import db from '../../../../../utils'

const conn = mongoose.connection
let bucket: mongoose.mongo.GridFSBucket

if (conn.readyState === 1) {
  bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  })
} else {
  conn.once('open', () => {
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images',
    })
  })
}

const imageCache: { [key: string]: Buffer } = {}

const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid Image ID' })
  }

  try {
    if (imageCache[id]) {
      res.setHeader('Content-Type', 'image/jpeg')
      return res.send(imageCache[id])
    }

    await db.connectToShop()

    const bufferChunks: Buffer[] = []
    bucket
      .openDownloadStream(new mongoose.Types.ObjectId(id))
      .on('data', (chunk) => bufferChunks.push(chunk))
      .on('error', (error) =>
        res
          .status(500)
          .json({ success: false, message: `Server Error => ${error}` })
      )
      .on('end', () => {
        const buffer = Buffer.concat(bufferChunks)
        imageCache[id] = buffer
        res.setHeader('Content-Type', 'image/jpeg')
        res.send(buffer)
      })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server Error => ${error}` })
  }
}

export default getImage

// import { NextApiRequest, NextApiResponse } from 'next'
// import mongoose from 'mongoose'
// import db from '../../../../../utils'

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

// const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToDatabase()

//     const { id } = req.query
//     if (!gfs) {
//       return res.status(500).json({ success: false, message: 'GridFS not initialized' })
//     }

//     const files = await gfs.find({ _id: new mongoose.Types.ObjectId(id as string) }).toArray()

//     if (!files || files.length === 0) {
//       return res.status(404).json({ success: false, message: 'No file exists' })
//     }

//     const readstream = gfs.openDownloadStream(files[0]._id)
//     res.setHeader('Content-Type', files[0].contentType || 'application/octet-stream')
//     readstream.on('error', (streamErr) => {
//       res.status(500).json({ success: false, message: `Stream error: ${streamErr.message}` })
//     })
//     readstream.pipe(res)
//   } catch (err) {
//     res.status(500).json({ success: false, message: `Server Error => ${(err as Error).message}` })
//   }
// }

// export default getImage
