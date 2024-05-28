/** @format */

import { GetServerSideProps, NextPage } from 'next'
import Details from '../Details'
import Head from 'next/head'
interface PostProps {
	post: {
		_id: string
		title: string
		src: string
		subImages: [string]
		price: number
		categories: [string]
		brand: string
		size: string
		color: string[]
		quantity: number
		description: string
		keywords: [string]
	}
}

const Post: NextPage<PostProps> = ({ post }) => {
	return <>{post && <Details post={post} />}</>
}

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
	params,
}) => {
	const title = params?.id as string
	console.log(params)
	const res = await fetch(
		`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client/page`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				category: '@L$L%O%F#D%M^',
				title: title, // Updated to use the post title as ID
				authType: 'G&E!T*P^R$O#D$U^C@T*S',
			}),
		}
	)
	const postData = await res.json()
	return {
		props: {
			post: postData.products, // Assuming your API response has a "products" field
		},
	}
}

export default Post
