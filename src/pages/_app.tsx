/** @format */

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState, createContext } from 'react'

export const BasketContext = createContext([])
const App = ({ Component, pageProps }: AppProps) => {
	const [basket, setBasket] = useState<string[]>([])
	return (
		<>
			<Head>
				<title> roommode </title>
				<meta
					name='description'
					content='top shop store'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='images/icon.png'
				/>
			</Head>
			<BasketContext.Provider value={[]}>
				<div>
					<Component {...pageProps} />
				</div>
			</BasketContext.Provider>
		</>
	)
}

export default App
