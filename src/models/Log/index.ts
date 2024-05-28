
import mongoose from 'mongoose'
 
const logSchema = new mongoose.Schema({
    user: { type: String, required: true },
    details:String,
	logName: { type: String, required: true },
 	time: String,
	status: String,
	ip: String,
	mac: String,
	webAgent: String,
})

const Log = mongoose.models.Log || mongoose.model('Log', logSchema)
export default Log
 