/** @format */

import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Image' },
  subImages: [{ type: Buffer, default: [] }],
  price: { type: Number },
  categories: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  description: { type: String },
  keywords: [{ type: String }],
  rates:Number
  // price: { type: Number, required: true },
  // calories: { type: Number, required: true },
  // categories: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
  //comments: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Comment",
  // },
  // description: { type: String, required: true },
  // keywords: [{ type: String }],
})

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product
