/** @format */

// cryptoUtils.js
import crypto from 'crypto'

const generateKeyAndIV = () => {
	const secretKey = crypto.randomBytes(32).toString('hex')
	const iv = crypto.randomBytes(16).toString('hex')
	return { secretKey, iv }
}

const encryptText = (text, secretKey, iv) => {
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(secretKey, 'hex'),
		Buffer.from(iv, 'hex')
	)
	let encryptedData = cipher.update(text, 'utf-8', 'hex')
	encryptedData += cipher.final('hex')
	return encryptedData
}

const decryptText = (encryptedText, secretKey, iv) => {
	const decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		Buffer.from(secretKey, 'hex'),
		Buffer.from(iv, 'hex')
	)
	let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8')
	decryptedData += decipher.final('utf-8')
	return decryptedData
}

export { generateKeyAndIV, encryptText, decryptText }
