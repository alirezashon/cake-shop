import { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../../../models/Client'
import ClientSession from '../../../../../models/Client/Session'
import Log from '../../../../../models/Log'
import db from '../../../../../utils'
import {
  generateKeyAndIV,
  encryptText,
} from '../../../../../Components/CryptoUtils'
import crypto from 'crypto'
import Profile from '@/models/Client/Profile'

// Generate token
const generateTokenoghlo = async (keyV: string, client: string) => {
  const { secretKey: sessionSecretKey, iv: sessionIv } = generateKeyAndIV()
  const generateSession = encryptText(
    `${keyV.split('&')[1]}%${keyV.split('&')[0]}`,
    sessionSecretKey,
    sessionIv
  )
  const kalim = crypto.randomBytes(16).toString('hex')
  const token = `${generateSession}#${kalim}`
  const session = new ClientSession({
    client,
    clientSessionToken: `${sessionIv}&${token}&${sessionSecretKey}`,
    key: kalim,
  })
  await session.save()
  return token
}

let generatedNumber: string | null = null

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      generatedNumber = Math.floor(10000 + Math.random() * 90000).toString()
      console.log(`Generated OTP: ${generatedNumber}`)
      res.status(200).json({ message: 'OTP generated', otp: generatedNumber })
    } else if (req.method === 'POST') {
      await db.connect2DB()
      const { phone, authType, otp } = req.body
      const logSchema = {
        user: phone,
        details: 'Register new user',
        logName: 'Register',
        status: '',
      }
      console.log(req.body)
      if (authType === 'C%L&i*l(r&e%g#i$s&p*h)o(n&e*T$e#R') {
        if (otp === generatedNumber) {
          const userSchema = await Client.findOne({ phone })
          if (userSchema) {
            const token = await generateTokenoghlo(
              userSchema.keyV,
              userSchema._id
            )
            res
              .status(200)
              .setHeader(
                'Set-Cookie',
                `CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k=${token}; Max-Age=${
                  60 * 60 * 24 * 7 * 22
                }; HttpOnly; Secure; SameSite=Strict; Path=/;`
              )
              .json({ message: 'Login successful', success: true })
          } else {
            const password = Array.from({ length: 23 }, () =>
              'ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789'.charAt(
                Math.floor(Math.random() * 62)
              )
            ).join('')

            logSchema.status = 'success'
            const { secretKey, iv } = generateKeyAndIV()
            const encryptedPassword = encryptText(password, secretKey, iv)
            const registerScheme = {
              phone,
              password: encryptedPassword,
              keyV: `${secretKey}&${iv}`,
            }

            const newClient = new Client(registerScheme)
            await newClient.save()
            console.log('New client registered')
            console.table(logSchema)
            const successSignIn = new Log(logSchema)
            await successSignIn.save()

            const token = await generateTokenoghlo(
              registerScheme.keyV,
              newClient._id
            )
            const profile = new Profile({
              client: newClient._id,
            })
            await profile.save()
            res
              .setHeader(
                'Set-Cookie',
                `CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k=${token}; Max-Age=${
                  60 * 60 * 24 * 7 * 22
                }; HttpOnly; Secure; SameSite=Strict; Path=/;`
              )
              .status(200)
              .json({ message: 'Registration successful', success: true })
          }
        } else {
          res.status(400).json({ message: 'Invalid OTP', success: false })
        }
      } else {
        res.status(401).json({ message: 'Unauthorized request', success: false })
      }
    } else {
      res.status(405).json({ message: 'Method not allowed', success: false })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default Register
