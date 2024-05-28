/** @format */

export const Add = async (id: string, price: number) => {
	const basket: string[] = JSON.parse(
		localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
	)

	const existIndex = basket?.findIndex(
		(post) => post.split('*2%2&7(7)5%5!1@2')[2] === id
	)

	if (existIndex !== -1) {
		// If the item already exists, increment its count
		const count = parseInt(basket[existIndex].split('*2%2&7(7)5%5!1@2')[3])

		basket[existIndex] = `${
			Array.from({ length: 7 }, () =>
				'ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789'.charAt(
					Math.floor(Math.random() * 62)
				)
			).join('') +
			'*2%2&7(7)5%5!1@2' +
			price +
			'*2%2&7(7)5%5!1@2' +
			id +
			'*2%2&7(7)5%5!1@2' +
			`${count + 1}`
		}`
	} else {
		// If the item does not exist, add a new one
		basket.push(
			`${
				Array.from({ length: 7 }, () =>
					'ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789'.charAt(
						Math.floor(Math.random() * 62)
					)
				).join('') +
				'*2%2&7(7)5%5!1@2' +
				price +
				'*2%2&7(7)5%5!1@2' +
				id +
				'*2%2&7(7)5%5!1@2' +
				'1'
			}`
		)
	}

	localStorage.setItem('#B!@%$&K&E^T*O(s&', JSON.stringify(basket))
}

export const Remove = async (id: string) => {
	const basket: string[] = JSON.parse(
		localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
	)

	const existIndex = basket.findIndex(
		(post) => post.split('*2%2&7(7)5%5!1@2')[2] === id
	)

	if (existIndex !== -1) {
		const count = parseInt(basket[existIndex]?.split('*2%2&7(7)5%5!1@2')[3])
		const price = basket[existIndex]?.split('*2%2&7(7)5%5!1@2')[1]
		count === 1
			? basket.splice(existIndex, 1)
			: (basket[existIndex] = `${
					Array.from({ length: 7 }, () =>
						'ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789'.charAt(
							Math.floor(Math.random() * 62)
						)
					).join('') +
					'*2%2&7(7)5%5!1@2' +
					price +
					'*2%2&7(7)5%5!1@2' +
					id +
					'*2%2&7(7)5%5!1@2' +
					`${count - 1}`
			  }`)
	}
	basket.length === 0
		? localStorage.removeItem('#B!@%$&K&E^T*O(s&')
		: localStorage.setItem('#B!@%$&K&E^T*O(s&', JSON.stringify(basket))
}

export const Get = (): string[][] => {
	const basket: string[] = JSON.parse(
		localStorage.getItem('#B!@%$&K&E^T*O(s&') || '[]'
	)
	const productsID = basket.map((post) => post.split('*2%2&7(7)5%5!1@2')[2])
	return [basket, productsID]
}
