/** @format */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import ClientSession from './models/Client/Session'
import Client from './models/Client'
import Profile from './models/Client/Profile'
import db from './utils/index.js'
import { Information } from './Interfaces'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/newReq/Pay') {
    const token = req.cookies.get('CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k' || '')
    if (!token) {
      return NextResponse.redirect(new URL('/newReq/Register', req.url))
    } else {
      await db.connectToShop()
      const kalim = token.value.split('#')[1].replace(/"$/, '')
      const session = await ClientSession.findOne({
        key: kalim,
      })
      if (session && session.key === kalim) {
        const clientSchema = await Client.findOne({ _id: session.client })
        if (clientSchema) {
          const profileSchema = await Profile.findOne({
            client: clientSchema._id,
          })
          if (!profileSchema.information[0]) {
            return NextResponse.redirect(new URL('newReq/address', req.url))
          }
        }
      } else {
        return NextResponse.redirect(new URL(`/Login`, req.url))
      }
    }
  }

  
  if (
    req.nextUrl.pathname === '/profile' ||
    req.nextUrl.pathname === '/newReq/Registered'
  ) {
    const target =
      req.nextUrl.pathname === '/profile'
        ? '/Login'
        : req.nextUrl.pathname === '/newReq/Registered' && '/newReq/Register'
    const cookie = req.cookies.get('CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k' || '')
    if (!cookie) {
      return NextResponse.redirect(new URL(`${target}`, req.url))
    } else {
      try {
        const validate = await fetch(
          `http://localhost:${process.env.PRODUCTION_PORT}/api/Auth/Session/Validator`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              authType: 'ClIeNt_ValidaTe*%',
              token: cookie.value,
            }),
          }
        )

        if (validate.status !== 200) {
          console.log('Session validation failed with status:', validate.status)
          return NextResponse.redirect(new URL(`${target}`, req.url))
        }
        await validate.json()
      } catch (error) {
        console.error('Error during session validation:', error)
        return NextResponse.redirect(new URL('/Error', req.url))
      }
    }
  }

  if (req.nextUrl.pathname === '/Login') {
    const cookie = req.cookies.get('CTFlEoiSHkeNnToMBLiShoOekn3kN2y@k' || '')
    if (cookie) {
      try {
        const validate = await fetch(
          `http://localhost:${process.env.PRODUCTION_PORT}/api/Auth/Session/Validator`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              authType: 'ClIeNt_ValidaTe*%',
              token: cookie.value,
            }),
          }
        )

        if (validate.status === 200) {
          return NextResponse.redirect(new URL(`/profile`, req.url))
        }
        await validate.json()
      } catch (error) {
        console.error('Error during session validation:', error)
        return NextResponse.redirect(new URL('/Error', req.url))
      }
    }
  }
  if (req.nextUrl.pathname === '/AnUIntegrationalTotheShopingtime') {
    const cookie = req.cookies.get('*a&D^d%d$D^M#i@m$M$i#n%i&a*m(o)kne3ykN2y@x')
    if (!cookie) {
      return NextResponse.redirect(
        new URL('/AnUIntegrationalTotheShopingtime/Login', req.url)
      )
    } else {
      try {
        const validate = await fetch(
          `http://localhost:${process.env.PRODUCTION_PORT}/api/Aderminathorapiamalistalisnaliswow/Validator`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              authType: 'Admin_ValidaTe*%',
              token: cookie.value,
            }),
          }
        )

        if (validate.status !== 200) {
          console.log('Session validation failed with status:', validate.status)
          return NextResponse.redirect(
            new URL(`/AnUIntegrationalTotheShopingtime/Login`, req.url)
          )
        }
        await validate.json()
      } catch (error) {
        console.error('Error during session validation:', error)
        return NextResponse.redirect(new URL('/Error', req.url))
      }
    }
  }
}
