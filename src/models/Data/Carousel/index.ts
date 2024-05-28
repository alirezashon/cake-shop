/** @format */

import mongoose from 'mongoose'

const carouselSchema = new mongoose.Schema({
	src: {
		type: String || mongoose.Schema.Types.ObjectId,
		ref: 'Data',
		required: true,
	},
	alt: String,
	keywords: [String],
})

const Carousel =
	mongoose.models.Carousel || mongoose.model('Carousel', carouselSchema)

export default Carousel
