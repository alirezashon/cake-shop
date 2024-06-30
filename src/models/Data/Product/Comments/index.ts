/** @format */

import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  client: { type: String, required: true },
  content: { type: String, required: true },
  response:String,
  time: { type: Date, default: new Date() },
})

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
