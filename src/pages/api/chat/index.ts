/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils'
import Chat from '../../../models/Chat'
import { MessageInterface } from '@/Interfaces'
const chat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const { authType, message, client } = req.body
      if (authType === '&M%e$A#g$e#I%n&Z*') {
        await db.connectToShop()
        const newMessage = {
          sender: '*u&$e#',
          content: message,
          time: new Date(),
        }
        const clientChat = await Chat.findOne({
          client,
        })
        if (clientChat) {
          await Chat.findOneAndUpdate(
            { client },
            { $push: { chats: newMessage } }
          )
            .then(() => res.status(200).json({ success: true }))
            .catch((err) => {
              console.error(err)
              res
                .status(500)
                .json({ success: false, error: 'Failed to update chat' })
            })
          console.log('ay baba chera nemishe pas')
        } else {
          console.log('ay baba chera nemishe')
          await Chat.create({ client, chats: [newMessage] })
            .then(() =>
              res.status(200).json({ success: true, message: 'raft toooo' })
            )
            .catch(() =>
              res.status(201).json({ success: false, message: 'naraft toooo' })
            )
        }
      }
    } else {
      res.status(409).json({ success: false, message: 'bad method' })
    }
  } catch (err) {
    res.status(500).json({ message: `Server Error => ${err}` })
  }
}
export default chat
