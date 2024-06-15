import mongoose, { Schema } from 'mongoose'

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  code: String,
  time: { type: Date, default: new Date() },
})
const Notification =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema)

export default Notification
