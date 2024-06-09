/** @format */

import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true },
  price: { type: Number, required: true },
  calories: { type: Number, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: { type: String, required: true },
  keywords: [{ type: String }],
})

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema)

export default Product
