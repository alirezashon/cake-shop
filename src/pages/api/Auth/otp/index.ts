import type { NextApiRequest, NextApiResponse } from 'next'

let generatedNumber: string | null = null

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    generatedNumber = Math.floor(10000 + Math.random() * 90000).toString()
    console.log(generatedNumber)
    res.status(200)
  } else if (req.method === 'POST') {
    const { value } = req.body

    if (value === generatedNumber) {
      res.status(200).json({ message: 'Values match' })
    } else {
      res.status(400).json({ message: 'Values do not match' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
