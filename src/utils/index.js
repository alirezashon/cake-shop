import mongoose from 'mongoose'

const connectToShop = async () => {
	try {
		await mongoose.connect(process.env.SHOP_DATA_MANAGEMENT_ENV, {
		})
	} catch (error) {
		console.error('MongoDB connection to Shop had  error:', error)
	}
}
const connect2DB = async () => {
	try {
		await mongoose.connect(process.env.HUB_DATA_USER_MANAGE_ENV, {
		})
	} catch (error) {
		console.error('MongoDB connection to Main DB had error:', error)
		process.exit(1)
	}
}
const db = { connectToShop, connect2DB }
export default db
