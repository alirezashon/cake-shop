// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const sendMail = async (req: NextApiRequest, res: NextApiResponse) => {
  //   if (req.method === 'POST') {
  //   const { email, subject, message } = req.body
//   try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        //     user: process.env.GMAIL_USER, // Your Gmail account
        //   pass: process.env.GMAIL_PASS, // Your Gmail account password or App Password
        user: 'alirezafeshki2017@gmail.com', // Your Gmail account
        pass: 'alireza1380', // Your Gmail account password or App Password
      },
    })

    const mailOptions = {
      from: 'alirezafeshki2017@gmail.com',
      to: 'akbariovich@gmail.com',
      subject: 'سلام علیکم',
      text: 'و علیکمالسلام ، سلام علیکم',
    }
    //   } else {
    // res.status(405).json({ success: false, message: 'Method not allowed' })
    //   }

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
//     res.status(200).json({ success: true, message: 'Email sent successfully' })
//   } catch (error) {
//     console.error('Error sending email:', error)
//     res.status(500).json({ success: false, message: 'Failed to send email' })
//   }
}

export default sendMail
