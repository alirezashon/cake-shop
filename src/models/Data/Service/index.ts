/** @format */

import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
	type: { type: String, required: true },
	src: { type: String, required: true },
	price: { type: Number, required: true },
	categories: [{ type: String, required: true }],
	brand: { type: String, required: true },
	description: { type: String, required: true },
	keywords: [{ type: String }],
})

const Service =
	mongoose.models.Service || mongoose.model('Service', serviceSchema)

export default Service
