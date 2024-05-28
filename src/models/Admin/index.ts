/** @format */

import mongoose from 'mongoose'
const adminSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	time: { type: Date, default: new Date() },
	keyV: { type: String, required: true },
})
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)
export default Admin