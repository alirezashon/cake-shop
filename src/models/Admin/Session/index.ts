import mongoose from 'mongoose'

const adminSessionSchema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Admin',
		required: true,
	},
	sessionToken: { type: String, required: true, unique: true },
	key: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 259200 },
})
const AdminSession =
	mongoose.models.AdminSession || mongoose.model('AdminSession', adminSessionSchema)
export default AdminSession