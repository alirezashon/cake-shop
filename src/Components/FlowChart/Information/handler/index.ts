/** @format */

import { toast } from 'react-toastify'

export const Register = async (
	setIsLoading: (arg: boolean) => void,
	phone: number,
	name: string,
	password: string,
 	nationalCode: string,
	houseNumber: number,
	houseUnit: number,
	zipCode: number,
	email: string,
	address: string
) => {
	setIsLoading(true)

	try {
		const response = await fetch('/api/Auth/Register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				phone,
				name,
				password,
				authType: 'C%L&i&E^n$T#R&E^g@i&s%T$e#R',
				nationalCode,
				houseNumber,
				houseUnit,
				zipCode,
				email,
				address,
			}),
		})
		const data = await response.json()
		if (data.success === true && response.status === 200) {	
			toast.success(data.message)
			setIsLoading(false)
			return 'S!A@k%s$e^x%f^u*l^'
		} else {
			toast.error(data.message)
			setIsLoading(false)
		}
	} catch (error) {
		console.log(error)
		toast.error('failed call login api' + error)
	}
}
