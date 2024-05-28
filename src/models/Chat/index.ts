/** @format */

import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
	client: {
		type: String,
		// type: mongoose.Schema.Types.ObjectId || String,
		// ref: 'Client',
	},
	content: { type: String, required: true },
	sender: { type: String, required: true },
	time: { type: Date, default: new Date() },
})
const Message =
	mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message
