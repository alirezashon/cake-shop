/** @format */

import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
	src: { type: String, required: true },
	alt: String,
	keywords: [String],
})

const Data = mongoose.models.Data || mongoose.model('Data', dataSchema)

export default Data
