import Image from 'next/image'
import styles from './index.module.css'
import Layout from '@/Layouts'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../../Components/Map/ContactMap/map'), {
  ssr: false,
})

const ContactUS = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.contactBox}>
          <div className={styles.paragraphs}>
            <p>021-88941993</p>
            <p>021-77748464</p>
            <p>021-22756410</p>
            <p>09226869767</p>
            <p>چهارراه ولیعصر</p>
            <p> تهران - تهرانپارس</p>
            <p> تهران - نیاوران</p>
          </div>
          <Image
            src={'/images/icon.png'}
            width={923}
            height={923}
            alt=''
            className={styles.logo}
            />
        </div>
            <p>روابط عمومی 09226869767</p>
      </div>
      <div className={styles.mapBox}>
      <Map />
      </div>
    </Layout>
  )
}
export default ContactUS
