/** @format */

import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
  client: String,
  chats: [
    {
      content: { type: String, required: true },
      sender: { type: String, required: true },
      time: { type: Date, default: new Date() },
    },
  ],
})
const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema)

export default Chat
