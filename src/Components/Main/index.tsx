// components/Main.tsx
import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const Main: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <Image
        className={styles.topImage}
        src={'/images/top.png'}
        width={1515}
        height={1212}
        alt=''
      />
      {/* <Image className={styles.bottImage} src={'/images/bottom.jpg'} width={1515}height={1212} alt=''/> */}

      <section className={styles.productsSection}>
        <h2>سفارش انواع کیک و شیرینی</h2>
        <div className={styles.products}>
          <div className={styles.product}>
            <Image src='/images/icon.png' width={1515} height={1212} alt='' className={styles.mainCakeImage} />
            <h3>کیک سفارشی</h3>
            <p>چاپ تصویر همراه با انتخاب اشکال گوناگون کیک</p>
          </div>
          <div className={styles.product}>
            <Image src='/images/icon.png' width={1515} height={1212} alt='' className={styles.mainCakeImage} />
            <h3>کافی شاپی</h3>
            <p>سفارش انبوه کیک های بسته بندی با بهترین کیفیت</p>
          </div>
          <div className={styles.product}>
            <Image src='/images/icon.png' width={1515} height={1212} alt='' className={styles.mainCakeImage} />
            <h3>شیرینی</h3>
            <p>فروش انواع شیرینی با بهترین قیمت و کیفیت </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main
