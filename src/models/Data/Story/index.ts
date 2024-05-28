/** @format */

import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
	data: {
		type: String || mongoose.Schema.Types.ObjectId,
		ref: 'Data',
		required: true,
	},
	alt: String,
	keywords: [String],
})

const Story =
	mongoose.models.Story || mongoose.model('Story', storySchema)

export default Story