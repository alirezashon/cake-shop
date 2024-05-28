/** @format */

import Image from 'next/image'
import { GiOrbDirection } from 'react-icons/gi'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
interface ImageStructure {
	src: string
}

const Carouselali = () => {
	const contoralif = useRef()
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [contoraliX, setContoraliX] = useState<number>()
	const [images, setImages] = useState<ImageStructure[]>([
		{ src: '/images/Gerdachala.webp' },
		{ src: '/images/jaraghalesquer.jpg' },
		{ src: '/images/Akbar.jpg' },
		{ src: '/images/Gerdachala.webp' },
		{ src: '/images/jaraghalesquer.jpg' },
		{ src: '/images/Akbar.jpg' },
		{ src: '/images/Gerdachala.webp' },
		{ src: '/images/jaraghalesquer.jpg' },
		{ src: '/images/Akbar.jpg' },
		{ src: '/images/Gerdachala.webp' },
		{ src: '/images/jaraghalesquer.jpg' },
		{ src: '/images/Akbar.jpg' },
	])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/data/Post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					products: '',
					category: '@L$L%O%F#D%M^',
					authType: 'G&E!T*P^R$O#D$U^C@T*S',
				}),
			})
			const data = await response.json()
			setImages(data.products)
			console.log(data)
		}
		// fetchData()
		const interval = setInterval(() => {
			setCurrentIndex((currentIndex + 1) % images.length)
		}, 4444)
		return () => clearInterval(interval)
	}, [currentIndex, images])

	const handleImageClick = (index: number) => {
		setCurrentIndex(index)
	}

	const nextImage = () => {
		setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
	}

	const previousImage = () => {
		setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
	}

	const containeralick = (e: MouseEvent) => {
		const containerali = e.currentTarget as HTMLElement
		const containeralWidth = containerali.getBoundingClientRect().width
		const containeraliStart = containerali.getBoundingClientRect().left
		const contoralWidth = containeralWidth / images.length
		const changeIndexTo = (e.clientX - containeraliStart) / contoralWidth
		setCurrentIndex(Math.floor(changeIndexTo))
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.carouselaliContainer}>
					<GiOrbDirection
						className={styles.directionsIcon}
						size={`${7 * 0.713}vh`}
						onClick={previousImage}
					/>
					<div className={styles.carouselali}>
						<div className={styles.circaliBox}>
							{images.map((image, index) => (
								<span
									className={`${styles.circali} ${
										index === currentIndex ? styles.circalActive : ''
									}`}
									onClick={() => setCurrentIndex(index)}
									key={index}></span>
							))}
						</div>
						<Image
							className={`${styles.image} ${styles.imageTransition}`}
							src={`${images[currentIndex].src}`}
							width={4444}
							height={4444}
							alt={'carousell'}
						/>
						<div
							className={styles.containerali}
							onClick={(e) => containeralick(e)}>
							<div
								className={styles.contorali}
								style={{
									width: `${100 / images.length}% `,
									marginLeft: `${(100 / images.length) * currentIndex}% `,
								}}></div>
						</div>
					</div>
					<GiOrbDirection
						className={styles.directionsIcon}
						size={`${7 * 0.713}vh`}
						onClick={nextImage}
					/>
				</div>
			</div>
		</>
	)
}
export default Carouselali
