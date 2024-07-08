import Image from 'next/image'
import styles from './index.module.css'
import Layout from '@/Layouts'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map'), {
  ssr: false,
})

const AboutUS = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.topBox}>
          <p>
            021-88941993 021-77748464 021-22756410 09226869767 تهران » تهرانپارس
            تهران - نیاوران تهران - چهارراه ولیعصر روابط عمومی 09226869767{' '}
          </p>
          <Image
            src={'/images/icon.png'}
            width={923}
            height={923}
            alt=''
            className={styles.logo}
          />
      </div>
        </div>
     <Map/>
    </Layout>
  )
}
export default AboutUS
