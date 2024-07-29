// pages/api/image.js

import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  const imagePath = path.resolve('D:\\personal\\cakekhoneh\\public\\images', 'cupcake-2.png')
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: 'Image not found' })
  }
  const image = fs.readFileSync(imagePath)

//   res.setHeader('Content-Type', 'image/jpeg') 
  res.send(image)
}
