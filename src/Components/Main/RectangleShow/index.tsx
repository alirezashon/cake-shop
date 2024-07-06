const products: ProductInterface[] = [
  {
    _id: '1',
    title: 'Product 1',
    src: '/images/1.jpg',
    subImages: [],
    price: 2999,
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
    price: 1999,
    categories: 'Category 2',
    rates: 4.0,
    comments: [],
    description: 'Description for product 2',
    keywords: ['keyword3', 'keyword4'],
  },
]
import styles from './index.module.css'
import { ProductInterface } from '@/Interfaces'
import { useRef, useEffect, RefObject, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Image from 'next/image'
import { Add, Get, Remove } from '../../Basket/Actions'
import { GiCrossMark } from 'react-icons/gi'
import { useBasket } from '@/Context/Basket'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { GetFave, AddFave, RemoveFave } from '../../Store/Favorites'
import Modal from '@/Components/Modal'

const ProductCarousel: React.FC = () => {
  const { basket, setBasket } = useBasket()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [productover, setProductover] = useState<number | null>(null)
  const [showProducto, setShowProducto] = useState<ProductInterface | null>(
    null
  )
  const [favorites, setFavorites] = useState<string[]>([])

  const carouselRef = useRef<HTMLDivElement>(null)
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    productBoxRef: useRef<HTMLDivElement>(null),
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showProducto &&
        !document
          .querySelector(`.${styles.productself}`)
          ?.contains(event.target as Node)
      ) {
        setShowProducto(null)
      }
    }

    if (showProducto) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProducto])
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
    if (refs.productBoxRef.current) {
      refs.productBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }
  const scrollRight = () => {
    if (refs.productBoxRef.current) {
      refs.productBoxRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }
  const increment = (id: string, price: number) => {
    Add(id, price)
    setBasket(Get())
  }

  const decrement = (id: string) => {
    Remove(id)
    setBasket(Get())
  }
  const addToBasket = (id: string, price: number) => {
    increment(id, price)
    setShowModal(true)
  }
  const addfave = (id: string) => {
    AddFave(id)
    setFavorites(GetFave())
  }

  const removefave = (id: string) => {
    RemoveFave(id)
    setFavorites(GetFave())
  }
  return (
    <div className={styles.carouselContainer}>
      <Modal
        show={showModal}
        data={{
          title: 'این کالا به سبد خرید اضافه شد!',
          message: `${showProducto?.title}`,
        }}
        onClose={() => setShowModal(false)}
      />
      <div className={styles.productBox} ref={refs.productBoxRef}>
        <IoIosArrowForward
          className={styles.leftDirection}
          onClick={scrollLeft}
        />
        {products?.map((product, productindex) => (
          <div
            key={productindex}
            onMouseOver={() => setProductover(productindex)}
            onMouseLeave={() => setProductover(null)}
            className={styles.product}
          >
            <Image
              onClick={() => setShowProducto(product)}
              loading='lazy'
              src={`${product.src}`}
              alt={product.title}
              width={1200}
              height={1200}
              className={styles.categorimage}
            />
            <div
              className={styles.productName}
              onClick={() => setShowProducto(product)}
            >
              {product.title}
            </div>
            {productover === productindex && (
              <div
                className={styles.productDescription}
                onClick={() => setShowProducto(product)}
              >
                {product.description}
              </div>
            )}
            <div className={styles.productPrice}>
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              تومان
            </div>
          </div>
        ))}
        <IoIosArrowForward
          className={styles.rightDirection}
          onClick={scrollRight}
        />
      </div>
      {showProducto?._id && (
        <div className={styles.containerShow}>
          <div className={styles.productself}>
            <GiCrossMark
              onClick={() => setShowProducto(null)}
              className={'cross'}
              fontSize={'4vh'}
            />
            <p className={styles.producTitlef}>{showProducto?.title}</p>
            <Image
              // src={`data:image/jpeg;base64,${showProducto?.src}`}
              src={showProducto?.src}
              alt={showProducto?.title}
              width={444}
              height={444}
              className={styles.productimagelf}
            />
            <div className={styles.productPrice}>
              {showProducto.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              تومان
            </div>
            <div className={styles.priceAction}>
              {parseInt(
                `${
                  basket[0][basket[1].indexOf(showProducto?._id)]?.split(
                    '*2%2&7(7)5%5!1@2'
                  )[3]
                }`
              ) > 0 ? (
                <div className={styles.details}>
                  <div className={styles.controlBox}>
                    <MdAddCircle
                      className={styles.inceriment}
                      onClick={() =>
                        increment(showProducto._id, showProducto.price)
                      }
                    />
                    <div className={styles.count}>
                      {`${
                        basket[0][basket[1].indexOf(showProducto._id)]?.split(
                          '*2%2&7(7)5%5!1@2'
                        )[3]
                      } `}
                      عدد در سبد شما
                    </div>
                    <FaMinus
                      className={styles.deceriment}
                      onClick={() => decrement(showProducto._id)}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={styles.addToBasket}
                  onClick={() =>
                    addToBasket(showProducto._id, showProducto.price)
                  }
                >
                  افزودن به سبد خرید
                </div>
              )}
            </div>
            <p className={styles.productDescriptelf}>
              {showProducto?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCarousel
