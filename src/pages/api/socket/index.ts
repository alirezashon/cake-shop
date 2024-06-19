// pages/api/socket.js or .ts

import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'
import db from '../../../utils'
import Chat from '../../../models/Chat'

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: any
}

const chat = async (req: NextApiRequest, res: ExtendedNextApiResponse) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...')
    const httpServer: NetServer = res.socket.server
    const io = new SocketIOServer(httpServer, {
      path: '/api/socket',
    })
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('A user connected')

      socket.on('sendMessage', async ({ authType, message, client }) => {
        if (authType === '&M%e$A#g$e#I%n&Z*') {
          await db.connectToShop()
          const newMessage = {
            sender: '*u&$e#',
            content: message,
            time: new Date().toISOString(),
          }

          const clientChat = await Chat.findOne({ client })
          if (clientChat) {
            await Chat.findOneAndUpdate(
              { client },
              { $push: { chats: newMessage } }
            )
              .then(() => {
                io.emit('message', { client, newMessage })
              })
              .catch((err) => {
                console.error('Failed to update chat', err)
              })
          } else {
            await Chat.create({ client, chats: [newMessage] })
              .then(() => {
                io.emit('message', { client, newMessage })
              })
              .catch((err) => {
                console.error('Failed to create chat', err)
              })
          }
        }
      })

      socket.on('disconnect', () => {
        console.log('A user disconnected')
      })
    })
  }

  res.end()
}

export default chat