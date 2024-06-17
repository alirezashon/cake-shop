/** @format */

import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  client: {
    type: String,
  },
  content: { type: String, required: true },
  sender: '*u&$e#' || '&a(D^m$n@',
  time: { type: Date, default: new Date() },
})
const Message =
  mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message
