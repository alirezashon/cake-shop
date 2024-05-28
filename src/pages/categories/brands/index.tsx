/** @format */

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
 interface Props {
		posts: [
			{
				_id: string
				title: string
				src: string
				subImages: [string]
				price: number
				categories: [string]
				brand: string
				quantity: number
				description: string
				keywords: [string]
			}
		]
 }
const Categories: NextPage<Props> = ({ posts }) => {
	return (
		<>
			{posts.map((post) => (
				<div key={post._id}>{post.categories}</div>
			))}
 		</>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const res = await fetch(
		`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				category: '@L$L%O%F#D%M^',
				authType: 'G&E!T*P^R$O#D$U^C@T*S',
			}),
		}
	)
	const callPosts = await res.json()
	const posts = callPosts.products

	return {
		props: {
			posts,
		},
	}
}

export default Categories
