import Image from 'next/image'
import styles from './index.module.css'
import ProductCarousel from '../Main/RectangleShow'

const CupcakeDisplay = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> کیک خونگی در تهران</h1>
      <div className={styles.cupcakeWrapper}>
        <div className={styles.cupcakeContainer}>
          <Image
            src={'/images/cupcake-1.png'}
            width={1200}
            height={1200}
            alt='Cupcake 1'
            className={styles.cupcakeImage}
          />
          <div className={styles.cupcakeLabel}>
            <p className={styles.cupcakeName}>کیک های فنجانی </p>
            <p className={styles.cupcakeDescription}>
              کیک های مخصوص کافه با تضمین ارسال به موقع و کیفیت بالا
            </p>
          </div>
          <Image
            src={'/images/preserver.png'}
            width={1600}
            height={1600}
            alt='Cupcake Stand Base'
            className={styles.baseImage}
          />
        </div>
        <div className={styles.cupcakeContainer}>
          <Image
            src={'/images/cupcake-2.png'}
            width={1200}
            height={1200}
            alt='Cupcake 2'
            className={styles.cupcakeImage}
          />
          <div className={styles.cupcakeLabel}>
            <p className={styles.cupcakeName}>کیک و شیرینی</p>
            <p className={styles.cupcakeDescription}>
              ارسال انواع شیرینی تر و خشک تازه ، در سرتاسر تهران
            </p>
          </div>
          <Image
            src={'/images/preserver.png'}
            width={1600}
            height={1600}
            alt='Cupcake Stand Base'
            className={styles.baseImage}
          />
        </div>
        <div className={styles.cupcakeContainer}>
          <Image
            src={'/images/cupcake-3.png'}
            width={1200}
            height={1200}
            alt='Cupcake 3'
            className={styles.cupcakeImage}
          />
          <div className={styles.cupcakeLabel}>
            <p className={styles.cupcakeName}>کیک های سفارشی</p>
            <p className={styles.cupcakeDescription}>
              سفارشی سازی کیک و شیرینی به انتخاب مشتری
            </p>
          </div>
          <Image
            src={'/images/preserver.png'}
            width={1600}
            height={1600}
            alt='Cupcake Stand Base'
            className={styles.baseImage}
          />
        </div>
      </div>

    </div>
  )
}

export default CupcakeDisplay
