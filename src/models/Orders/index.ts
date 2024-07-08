/** @format */

import moment from 'jalali-moment'
import mongoose from 'mongoose'

const alirezaman = new Date()

const orderSchema = new mongoose.Schema({
	ticketID: {
		type: String,
		default: `CAKE-${moment()
			.locale('fa')
			.format(
				'YYMMDD'
			)}${alirezaman.getHours()}${alirezaman.getMinutes()}${alirezaman.getSeconds()}`,
	},
	status: { type: String, required: true },
	address: { type: String, required: true },
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
	],

	totalPrice: {
		type: Number,
		required: true,
	},
	attachment: [{ type: String }],
})
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Order
