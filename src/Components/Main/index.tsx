import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import ProductCarousel from './RectangleShow'
import CircularLinks from '../CircularLinks'

const categories = [
  {
    _id: '1',
    name: 'شیرینی گل محمدی',
    src: '/images/iconn.png',
    keywords: ['dessert', 'sweet', 'baking', 'cupcake', 'frosting'],
  },
  {
    _id: '2',
    name: 'کیک یزدی',
    src: '/images/iconn.png',
    keywords: ['dessert', 'sweet', 'baking', 'cookie', 'chocolate chip'],
  },
  {
    _id: '3',
    name: 'کیک نامزدی',
    src: '/images/iconn.png',
    keywords: ['dessert', 'sweet', 'baking', 'pastry', 'croissant'],
  },
  {
    _id: '4',
    name: 'کیک دخترانه',
    src: '/images/iconn.png',
    keywords: ['dessert', 'sweet', 'baking', 'cake', 'birthday cake'],
  },
  {
    _id: '5',
    name: 'کیک تولد',
    src: '/images/iconn.png',
    keywords: ['bread', 'baking', 'loaf', 'sourdough', 'whole grain'],
  },
]

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
]

const Main: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotation, setRotation] = useState({ rotateY: 14, rotateX: 0 })
  const [rotationOnScroll, setRotationOnScroll] = useState({
    rotateY: 14,
    rotateX: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handleScroll = () => {
    const scrollY = window.scrollY
    const rotateY = ((scrollY / innerHeight) * 8).toFixed(2)
    const rotateX = ((scrollY / innerHeight) * 7).toFixed(2)

    setRotationOnScroll({
      rotateY: parseFloat(rotateY),
      rotateX: parseFloat(rotateX),
    })
  }

  useEffect(() => {
    addEventListener('scroll', handleScroll)

    return () => {
      removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { left, width, top, height } = currentTarget.getBoundingClientRect()
    const x = clientX - left
    const y = clientY - top

    const rotateY = (x / 33).toFixed(2) // -14 to 14 degrees
    const rotateX = (y / 22).toFixed(2) // -7 to 7 degrees

    setRotation({
      rotateY: parseFloat(rotateY),
      rotateX: parseFloat(rotateX),
    })
  }

  return (
    <div className={styles.mainContainer}>
      <Image
        className={styles.topImage}
        src={'/images/top.png'}
        width={1515}
        height={1212}
        alt=''
      />
      <div className={styles.gotorder}>
        <h2>سفارش انواع کیک و شیرینی</h2>
      </div>
      <div className={styles.backgroundContainer} onMouseMove={handleMouseMove}>
        <div className={styles.leftImageSide} style={{ perspective: '60vh' }}>
          <Image
            className={styles.leftImage}
            src={'/images/a1.png'}
            width={1515}
            height={1212}
            alt=''
            style={{
              transform: `rotateY(${rotation.rotateY}deg) rotateX(${rotation.rotateX}deg)`,
            }}
          />
        </div>

        <div className={styles.rightImageSide} style={{ perspective: '60vh' }}>
          <Image
            className={styles.rightImage}
            src={'/images/a3.png'}
            width={1515}
            height={1212}
            alt=''
            style={{
              transform: `rotateY(${-rotation.rotateY}deg) rotateX(${
                rotation.rotateX
              }deg)`,
            }}
          />
        </div>
      </div>
      {/* <div className={styles.carousel}>
        <div
          className={styles.topBackground}
          style={{
            background: `url(${images[currentImageIndex]}) center center/cover no-repeat`,
          }}
        ></div>
        <div className={styles.prevButton} onClick={handlePrevious}>
          {'<'}
        </div>
        <div className={styles.nextButton} onClick={handleNext}>
          {'>'}
        </div>
      </div> */}
      <div className={styles.RectangleShow}>
        <ProductCarousel />
      </div>
      <section className={styles.productsSection}>
        <CircularLinks data={categories} />
        <div className={styles.productBox}>
          <div className={styles.product}>
            <h3>کیک سفارشی</h3>
            <Image
              src='/images/icon.png'
              width={1515}
              height={1212}
              alt=''
              className={styles.mainCakeImage}
            />
            <p>چاپ تصویر همراه با انتخاب اشکال گوناگون کیک</p>
          </div>
          <div className={styles.product}>
            <h3>کافی شاپی</h3>
            <Image
              src='/images/icon.png'
              width={1515}
              height={1212}
              alt=''
              className={styles.mainCakeImage}
            />
            <p>سفارش انبوه کیک های بسته بندی با بهترین کیفیت</p>
          </div>
          <div className={styles.product}>
            <h3>شیرینی</h3>
            <Image
              src='/images/icon.png'
              width={1515}
              height={1212}
              alt=''
              className={styles.mainCakeImage}
            />
            <p>فروش انواع شیرینی با بهترین قیمت و کیفیت </p>
          </div>
        </div>
      </section>
      <section className={styles.bottomSection}>
        <div className={styles.mainImageSide}>
          <Image
            className={styles.mainImage}
            src={'/images/1.jpg'}
            width={1515}
            height={1212}
            alt=''
          />
          <Image
            className={styles.mainImage}
            src={'/images/1.jpg'}
            width={1515}
            height={1212}
            alt=''
          />
          <Image
            className={styles.mainImage}
            src={'/images/1.jpg'}
            width={1515}
            height={1212}
            alt=''
          />
          <Image
            className={styles.mainImage}
            src={'/images/1.jpg'}
            width={1515}
            height={1212}
            alt=''
          />
        </div>
        <div className={styles.leftImageSide} style={{ perspective: '60vh' }}>
          <Image
            className={styles.bottomReftImage}
            src={'/images/a3.png'}
            width={1515}
            height={1212}
            alt=''
            style={{
              transform: `rotateY(${rotationOnScroll.rotateY}deg) rotateX(${rotationOnScroll.rotateX}deg)`,
            }}
          />
        </div>
        <div className={styles.rightImageSide} style={{ perspective: '60vh' }}>
          <Image
            className={styles.bottomRightImage}
            src={'/images/a4.png'}
            width={1515}
            height={1212}
            alt=''
            style={{
              transform: `rotateY(${-rotationOnScroll.rotateY}deg) rotateX(${
                rotationOnScroll.rotateX
              }deg)`,
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Main
