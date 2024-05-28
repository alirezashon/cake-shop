/** @format */

import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
	name: { type: String, required: true },
	en: { type: String, required: true },
	src: { type: String, required: true },
	description: String,
	keywords: [String],
})

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema)

export default Brand
