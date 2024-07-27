import mongoose from 'mongoose'
const conn = mongoose.connection
const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
  bucketName: 'images',
})
export const getImageBase64 = (
  id: mongoose.Types.ObjectId
): Promise<string> => {
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
