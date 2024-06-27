import Product from '@/models/Data/Product'
import db from '@/utils/'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()
    const imageDir = path.resolve('D:\\personal\\cakekhoneh\\public\\producto')

    const images = fs.readdirSync(imageDir)

    const data = images.map(async (image) => {
      const filePath = path.join(imageDir, image)
      const base64Image = fs.readFileSync(filePath).toString('base64')
      await Product.create({
        title: 'کیک',
        src: base64Image,
      })
    })

    // await Product.insertMany(data)

    res.status(200).json({
      success: true,
      message: 'Products inserted successfully',
    })
  } catch (err) {
    res.status(500).json({ success: false, message: `Server Error => ${err}` })
  }
}

export default Shop
