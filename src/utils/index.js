import mongoose from 'mongoose'

const connectToShop = async () => {
	try {
		await mongoose.connect(process.env.SHOP_DATA_MANAGEMENT_ENV, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	} catch (error) {
		console.error('MongoDB connection to Shop had  error:', error)
	}
}
const connect2DB = async () => {
	try {
		await mongoose.connect(process.env.HUB_DATA_USER_MANAGE_ENV, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	} catch (error) {
		console.error('MongoDB connection to Main DB had error:', error)
		process.exit(1)
	}
}
const db = { connectToShop, connect2DB }
export default db

// import { MongoClient } from 'mongodb'

// export async function connectToDataDB() {
// 	const client = new MongoClient(process.env.SHOP_DATA_MANAGEMENT_ENV)
// 	try {
// 		await client.connect()
// 		console.log('Connected to the data database')
// 		return client.db()
// 	} catch (error) {
// 		console.error('Error connecting to the data database:', error)
// 		throw error
// 	}
// }

// export async function connectToOtherDB() {
// 	const client = new MongoClient(process.env.HUB_DATA_USER_MANAGE_ENV)
// 	try {
// 		await client.connect()
// 		console.log('Connected to the other database')
// 		return client.db()
// 	} catch (error) {
// 		console.error('Error connecting to the other database:', error)
// 		throw error
// 	}
// }
