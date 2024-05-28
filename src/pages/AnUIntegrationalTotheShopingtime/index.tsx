/** @format */

import { useState } from 'react'
import Admin from '../../Components/Admin'
interface Post {
	_id: string
	title: string
	src: string
	subImages: string[]
	price: number
	categories: string[]
	type: string
	size: string
	color: string[]
	quantity: number
	description: string
	keywords: [string]
}
interface Brands {
	_id: string
	name: string
	en: string
	src: string
	description: string
	keywords: [String]
}
interface carousel {
	_id: string
	src: string
	alt: String
	keywords: [String]
}

const AnUIntegrationalTotheShopingtime: React.FC = () => {
	return (
		<>
			<Admin />
		</>
	)
}

export default AnUIntegrationalTotheShopingtime
