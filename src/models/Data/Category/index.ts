/** @format */

import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	src: { type: Buffer, required: true },
	keywords: [String],
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
