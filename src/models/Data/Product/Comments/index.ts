/** @format */

import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  client: { type: String, required: true },
  content: {
    txt: { type: String, required: true },
    time: {
      type: Date,
      default: () => new Date(new Date().toISOString().slice(4, 15)),
    },
  },
  response: {
    txt: { type: String, required: true },
    time: {
      type: Date,
      default: () => new Date(new Date().toISOString().slice(4, 15)),
    },
  },
  rates: Number,
})

const Comment =
  mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
