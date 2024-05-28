/** @format */

import mongoose from 'mongoose'
const clientSchema = new mongoose.Schema({
	email: String,
	name: String,
	nationalCode: String,
	phone: { type: Number, required: true, unique: true },
	password: { type: String, required: true },
	information: {
		address: String,
		houseNumber: Number,
		houseUnit: Number,
		zipCode: Number,
	},
	time: { type: Date, default: new Date() },
	keyV: { type: String, required: true },
})
const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)
export default Client
