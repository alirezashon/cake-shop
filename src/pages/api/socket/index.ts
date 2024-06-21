// import { Server as NetServer } from 'http'
// import { NextApiRequest, NextApiResponse } from 'next'
// import { Server as SocketIOServer } from 'socket.io'
// import db from '../../../utils'
// import Chat from '../../../models/Chat'

// interface ExtendedNextApiResponse extends NextApiResponse {
//   socket: any
// }

// const chat = async (req: NextApiRequest, res: ExtendedNextApiResponse) => {
//   if (!res.socket.server.io) {
//     console.log('Setting up Socket.IO server...')
//     const httpServer: NetServer = res.socket.server
//     const io = new SocketIOServer(httpServer, {
//       path: '/api/socket',
//     })
//     res.socket.server.io = io

//     io.on('connection', (socket) => {
//       console.log('A user connected')

//       socket.on('sendMessage', async ({ authType, message, client }) => {
//         await db.connectToShop()
//         if (authType === '&M%e$A#g$e#I%n&Z*') {
//           const newMessage = {
//             sender: '*u&$e#',
//             content: message,
//             time: new Date().toISOString(),
//           }

//           const clientChat = await Chat.findOne({ client })
//           if (clientChat) {
//             await Chat.findOneAndUpdate(
//               { client },
//               { $push: { chats: newMessage } }
//             )
//               .then(() => {
//                 io.emit('message', { client, newMessage })
//               })
//               .catch((err) => {
//                 console.error('Failed to update chat', err)
//               })
//           } else {
//             await Chat.create({ client, chats: [newMessage] })
//               .then(() => {
//                 io.emit('message', { client, newMessage })
//               })
//               .catch((err) => {
//                 console.error('Failed to create chat', err)
//               })
//           }
//         }else if (authType ==='^a&M&d(i*n^a$t%0#l$N(b)i*' ){
//           const newMessage = {
//             sender: '&a(D^m$n@',
//             content: message,
//             time: new Date().toISOString(),
//           }

//           const clientChat = await Chat.findOne({ client })
//           if (clientChat) {
//             await Chat.findOneAndUpdate(
//               { client },
//               { $push: { chats: newMessage } }
//             )
//               .then(() => {
//                 io.emit('message', { client, newMessage })
//               })
//               .catch((err) => {
//                 console.error('Failed to update chat', err)
//               })
//           }
//         }
//       })

//       socket.on('disconnect', () => {
//         console.log('A user disconnected')
//       })
//     })
//   }

//   res.end()
// }

// export default chat
// Import required modules and types
// pages/api/socket.ts

import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'
import db from '../../../utils'
import Chat from '../../../models/Chat'
import { Server as HTTPServer } from 'http'
import { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'

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
        } else if (authType === '^a&M&d(i*n^a$t%0#l$N(b)i*') {
          await db.connectToShop()
          const newMessage = {
            sender: '&a(D^m$n@',
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

export default socketManager
