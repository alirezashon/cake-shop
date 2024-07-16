// components/Main.tsx
import React from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const Main: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <Image
        src='/images/bottom.png'
        width={1515}
        height={1212}
        alt=''
        className={styles.bottomImage}
      />
     <Image
        src='/images/sepidcako.png'
        width={1515}
        height={1212}
        alt=''
        className={styles.cakomage}
      />
      <section className={styles.productsSection}>
        <h2>ارسال به تمام نقاط تهران</h2>
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
        </div>
      </section>
    </div>
  )
}

export default Main
