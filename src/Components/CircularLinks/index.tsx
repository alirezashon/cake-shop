/** @format */

import Image from 'next/image'
import styles from './index.module.css'
import Link from 'next/link'
interface Data {
	_id: string
	name: string
	en: string
	src: string
	description: string
	keywords: [String]
}
interface Props {
	props: Data[]
}

const CircularLinks: React.FC<Props> = ({ props }) => {
	return (
		<>
			<div className={styles.container}>
				{props.length > 0 &&
					props.map((item,index) => (
						<Link
							key={index}
							href={`/categories/${item.name}`}
							className={styles.model}>
							<Image
								src={`data:image/jpeg;base64,${item.src}`}
								alt={item.description}
								className={styles.image}
								width={99}
								height={99}
							/>
							<h3>{item.name}</h3>
						</Link>
					))}
			</div>
		</>
	)
}
export default CircularLinks
