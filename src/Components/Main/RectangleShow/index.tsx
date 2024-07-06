import styles from './index.module.css'
import { ProductInterface } from '@/Interfaces'
import { useRef, useEffect, RefObject } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Image from 'next/image'

const products: ProductInterface[] = [
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 29.99,
    categories: 'Category 1',
    rates: 4.5,
    comments: [],
    description: 'Description for product 1',
    keywords: ['keyword1', 'keyword2'],
  },
  {
    _id: '2',
    title: 'Product 2',
    src: '/images/2.jpg',
    subImages: [],
    price: 19.99,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 29.99,
    categories: 'Category 1',
    rates: 4.5,
    comments: [],
    description: 'Description for product 1',
    keywords: ['keyword1', 'keyword2'],
  },
  {
    _id: '2',
    title: 'Product 2',
    src: '/images/2.jpg',
    subImages: [],
    price: 19.99,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 29.99,
    categories: 'Category 1',
    rates: 4.5,
    comments: [],
    description: 'Description for product 1',
    keywords: ['keyword1', 'keyword2'],
  },
  {
    _id: '2',
    title: 'Product 2',
    src: '/images/2.jpg',
    subImages: [],
    price: 19.99,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 29.99,
    categories: 'Category 1',
    rates: 4.5,
    comments: [],
    description: 'Description for product 1',
    keywords: ['keyword1', 'keyword2'],
  },
  {
    _id: '2',
    title: 'Product 2',
    src: '/images/2.jpg',
    subImages: [],
    price: 19.99,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 29.99,
    categories: 'Category 1',
    rates: 4.5,
    comments: [],
    description: 'Description for product 1',
    keywords: ['keyword1', 'keyword2'],
  },
  {
    _id: '2',
    title: 'Product 2',
    src: '/images/2.jpg',
    subImages: [],
    price: 19.99,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
]

const ProductCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    categoryBoxRef: useRef<HTMLDivElement>(null),
  }
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }
  const scrollLeft = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }
  const scrollRight = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.categoryBox} ref={refs.categoryBoxRef}>
        <IoIosArrowForward
          className={styles.leftDirection}
          onClick={scrollLeft}
        />
        {products?.map((product, productindex) => (
          <div key={productindex} className={styles.category}>
            <Image
              loading='lazy'
              src={`${product.src}`}
              alt={product.title}
              width={1200}
              height={1200}
              className={styles.categorimage}
            />
            <div className={styles.categoryName}>{product.title}</div>
            <div className={styles.categoryPrice}>{product.price}</div>
          </div>
        ))}
        <IoIosArrowForward
          className={styles.rightDirection}
          onClick={scrollRight}
        />
      </div>

    </div>
  )
}

export default ProductCarousel
