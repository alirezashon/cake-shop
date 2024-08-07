import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'
import db from '@/utils'
import Product from '@/models/Data/Product'
import { Server as HTTPServer } from 'http'
import { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'
import mongoose from 'mongoose'
import { getImageBase64 } from '@/lib'

interface SocketServer extends HTTPServer {
  io?: IOServer
}

interface SocketWithServer extends NetSocket {
  server: SocketServer
}

export interface ExtendedNextApiResponse extends NextApiResponse {
  socket: SocketWithServer
}

const socketManager = async (
  req: NextApiRequest,
  res: ExtendedNextApiResponse
) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...')
    const httpServer: NetServer = res.socket.server
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket/Store',
    })
    res.socket.server.io = io

    io.on('connection', async (socket) => {
      socket.on('getStore', async ({ authType }) => {
        if (authType !== '(m&n)w%I@t!n^O%l%a&v*E)') {
          socket.emit('unauthorized', 'Unauthorized access')
          socket.disconnect()
          return
        }

        try {
          await db.connect2DB()
          const conn = mongoose.connection
          const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'images',
          })

          const products = await Product.find().exec()

          socket.emit('count', products.length)
          let sentCount = 0

          for (const product of products) {
            const srcBase64 = await getImageBase64(product.src)
            const subImagesBase64 = await Promise.all(
              product.subImages.map(async (subImage: any) => {
                const subImageBase64 = await getImageBase64(subImage)
                return subImageBase64
              })
            )

            socket.emit('product', {
              ...product.toObject(),
              src: srcBase64,
              subImages: subImagesBase64,
            })
            sentCount++
            if (sentCount === products.length) {
              socket.emit('done')
              socket.disconnect()
            }
          }
        } catch (error) {
          console.error(error)
          socket.emit('error', 'Internal server error')
        }
      })

      socket.on('disconnect', () => {})
    })
  }

  res.end()
}

export default socketManager
