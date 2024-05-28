/** @format */

import { Brand, Post } from '../DTO'
import dynamic from 'next/dynamic'
import styles from './index.module.css'
const Navigation = dynamic(() => import('../Components/Navigation'), {
	loading: () => <div className={styles.loadingNav}></div>,
})
const Story = dynamic(() => import('../Components/Story'), {
	loading: () => <div className={styles.loadingStory}></div>,
})
const CircularLinks = dynamic(() => import('../Components/CircularLinks'), {
	loading: () => <div className={styles.loadingCirculate}></div>,
})
const Carouselali = dynamic(() => import('../Components/Carouselali'), {
	loading: () => <div className={styles.loadingCarousel}></div>,
})
const ModOne = dynamic(() => import('../Components/PostBox/ModOne'), {
	loading: () => <div className={styles.loadingPost}></div>,
})
const ChatUI = dynamic(() => import('../Components/Chat'), {
	loading: () => <div className={styles.loadingChat}></div>,
})
interface Props {
	posts: Post[]
	brands: Brand[]
	carousel: [
		{
			_id: string
			src: string
			alt: String
			keywords: [String]
		}
	]
	totalPrice: [number, number]
	basket: string[][]
	setBasket: (items: string[][]) => void
	basketData: Post[]
}
const Handler: React.FC<Props> = ({
	posts,
	brands,
	carousel,
	totalPrice,
	basket,
	setBasket,
	basketData,
}) => {
	return (
		<>
			{posts && (
				<div style={{ display: 'grid', gap: '1vh' }}>
					<div>
						<Navigation
							basket={basket}
							basketData={basketData}
							setBasketStore={setBasket}
							totalPrice={totalPrice}
						/>
					</div>
					<div>
						<Story structure={posts} />
					</div>
					<div>
						<Carouselali structure={carousel} />
					</div>
					<div>
						<CircularLinks props={brands} />
					</div>
					<div>
						<ModOne
							posts={posts}
							basketStore={basket}
							setBasketStore={setBasket}
						/>
					</div>
					<div>
						<ChatUI />
					</div>
				</div>
			)}
		</>
	)
}
export default Handler
