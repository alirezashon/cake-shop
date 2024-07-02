import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import Product from '@/models/Data/Product'
import db from '@/utils/'

const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()
    const imageDir = path.resolve('D:\\personal\\ax\\producto\\kama')

    const images = fs.readdirSync(imageDir)

    for (const image of images) {
      const filePath = path.join(imageDir, image)

      try {
        // Read the file using streaming to handle large files
        const readStream = fs.createReadStream(filePath)

        // Create a new product with the image as a Buffer
        const product = new Product({
          title: 'کیک', // Example title
        })

        await new Promise<void>((resolve, reject) => {
          const chunks: any[] = []
          readStream.on('data', (chunk) => {
            chunks.push(chunk)
          })

          readStream.on('end', async () => {
            const buffer = Buffer.concat(chunks)
            product.src = buffer

            await product.save()
            resolve() // Resolve with no arguments
          })

          readStream.on('error', (err) => {
            reject(err)
          })
        })
      } catch (err) {
        console.error('Error processing file:', err)
      }
    }

    res.status(200).json({
      success: true,
      message: 'Products inserted successfully',
    })
  } catch (err) {
    console.error('Error storing products:', err)
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}

export default Shop

// import Product from '@/models/Data/Product'
// import db from '@/utils/'
// import { NextApiRequest, NextApiResponse } from 'next'
// import fs from 'fs'
// import path from 'path'

// const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await db.connect2DB()
//     const imageDir = path.resolve('D:\\personal\\cakekhoneh\\public\\producto')

//     const images = fs.readdirSync(imageDir)

//     const data = images.map(async (image) => {
//       const filePath = path.join(imageDir, image)
//       const base64Image = fs.readFileSync(filePath).toString('base64')
//       await Product.create({
//         title: 'کیک',
//         src: base64Image,
//       })
//     })

//     // await Product.insertMany(data)

//     res.status(200).json({
//       success: true,
//       message: 'Products inserted successfully',
//     })
//   } catch (err) {
//     res.status(500).json({ success: false, message: `Server Error => ${err}` })
//   }
// }

// export default Shop
