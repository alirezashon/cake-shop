/** @format */

import mongoose from 'mongoose'

const saleSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	},
	sale: {
		percentage: String,
		price: Number,
		required: true,
	},
	crypt: { type: String, required: true },
})
const Sale = mongoose.models.Sale || mongoose.model('Sale', saleSchema)
export default Sale
