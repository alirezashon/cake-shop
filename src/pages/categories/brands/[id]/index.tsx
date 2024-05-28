/** @format */

import { GetServerSideProps, NextPage } from 'next'

interface PostProps {
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

const Post: NextPage<PostProps> = ({ posts }) => {
	return (
		<>
			{posts.map((post) => (
				<div key={post._id}>{post.title}</div>
			))}
		</>
	)
}
export const getServerSideProps: GetServerSideProps<PostProps> = async ({
	params,
}) => {
	const brand = params?.id as string
	const res = await fetch(`http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			category: `${brand}rAz@L$L%O%F#D%M^`,
			authType: 'G&E!T*P^R$O#D$U^C@T*S',
		}),
	})
	const postData = await res.json()
	return {
		props: {
			posts: postData.products,
		},
	}
}
export default Post
