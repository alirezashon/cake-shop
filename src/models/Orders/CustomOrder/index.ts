/** @format */

import moment from 'jalali-moment'
import mongoose from 'mongoose'

const alirezaman = new Date()

const customOrderSchema = new mongoose.Schema({
  ticketID: {
    type: String,
    default: `CAKE-${moment()
      .locale('fa')
      .format(
        'YYMMDD'
      )}${alirezaman.getHours()}${alirezaman.getMinutes()}${alirezaman.getSeconds()}`,
  },
  status: { type: String, required: true },
  address: { type: String },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  details: {},
  totalPrice: Number,
  attachment: [{ type: String }],
})
const CustomOrder =
  mongoose.models.CustomOrder ||
  mongoose.model('CustomOrder', customOrderSchema)
export default CustomOrder
