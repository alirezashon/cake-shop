import Image from 'next/image'
import styles from './index.module.css'
import Layout from '@/Layouts'
const AboutUS = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.topBox}>
          <p>
            در مجموعه کیک خونگی هر روز صبح برای تهیه بهترین محصول اقدام
            می‌نماییم و با استفاده از جدیدترین متدها و محصولات موجود اقدام به
            تهیه با بیشترین توان خود می‌کنیم. تمام موارد بهداشتی و کیفی را با
            نهایت حساسیت دنبال می‌کنیم تا ارائه‌کننده بهترین‌ها به شما عزیزان
            باشیم.
          </p>
          <Image
            src={'/images/icon.png'}
            width={923}
            height={923}
            alt=''
            className={styles.logo}
          />
        </div>
        <h2>چرا کیک خونگی؟</h2>
        <div className={styles.middleBox}>
          <p>تجربه افراد</p>
          <span>متعهد </span>
          <p>تخصص</p>
          <span>بهترین کیفیت</span>
        </div>
        <h2>بهترین فروشگاه آنلاین کیک و شیرینی</h2>
        <div className={styles.bottomBox}>
     <p>

        مجموعه‌ای از افراد متعهد و متخصص را گرد هم آورده‌ایم و بهترین ابزار و
        اجناس را با بهترین کیفیت را در اختیارشان قرار داده‌ایم تا بهترین‌ها را
        برای شما عزیزان مهیا کنند. قدیمی‌ها می‌گفتند یک شیرینی خوب به زندگی بوی
        فوق‌العاده‌ای می‌بخشه و تا وقتی که اون کارش رو خوب بلد باشه همیشه
        می‌تونه زندگی رو قشنگتر و جذاب‌تر کنه. واقعاً حق با اوناست همیشه باید به
        بهترین‌ها سپرد.
     </p>
     <div className={styles.imagesBox}>

     <Image
            src={'/images/a4.png'}
            width={923}
            height={923}
            alt=''
            className={styles.images}
            />
             <Image
            src={'/images/a4.png'}
            width={923}
            height={923}
            alt=''
            className={styles.images}
            />
             <Image
            src={'/images/a4.png'}
            width={923}
            height={923}
            alt=''
            className={styles.images}
            />
             <Image
            src={'/images/a4.png'}
            width={923}
            height={923}
            alt=''
            className={styles.images}
            />
            </div>
        </div>
      </div>
    </Layout>
  )
}
export default AboutUS
