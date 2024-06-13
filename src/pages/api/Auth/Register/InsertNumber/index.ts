/** @format */

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

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect2DB()
    if (req.method !== 'POST') {
      return res.status(409).json({ message: 'Invalid request method' })
    }

    const { phone, authType } = req.body
    console.log(req.body)
    const logSchema = {
      user: phone,
      details: 'Register new user',
      logName: 'Register',
      status: '',
    }

    const password = Array.from({ length: 23 }, () =>
      'ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789'.charAt(
        Math.floor(Math.random() * 62)
      )
    ).join('')

    if (authType !== 'C%L&i*l(r&e%g#i$s&p*h)o(n&e*T$e#R') {
      return res.status(407).json({
        message: 'Authentication Type not in body of request, check Auth API',
      })
    }

    const userSchema = await Client.findOne({ phone })
    if (userSchema) {
      logSchema.status = 'failed'
      const failedSignIn = new Log(logSchema)
      await failedSignIn.save()
      console.table(logSchema)
      return res
        .status(209)
        .json({ message: 'این شماره قبلا به ثبت رسیده', success: false })
    }

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

    // Generate token
    const generateTokenoghlo = async () => {
      const { secretKey: sessionSecretKey, iv: sessionIv } = generateKeyAndIV()
      const generateSession = encryptText(
        `${registerScheme.keyV.split('&')[1]}%${
          registerScheme.keyV.split('&')[0]
        }`,
        sessionSecretKey,
        sessionIv
      )
      const kalim = crypto.randomBytes(16).toString('hex')
      const token = `${generateSession}#${kalim}`
      const session = new ClientSession({
        client: newClient._id,
        clientSessionToken: `${sessionIv}&${token}&${sessionSecretKey}`,
        key: kalim,
      })
      console.log('Session created')
      console.table(session)
      await session.save()
      return token
    }

    const token = await generateTokenoghlo()
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
      .json({ message: 'ثبت نام با موفقیت انجام شد', success: true })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export default Register
