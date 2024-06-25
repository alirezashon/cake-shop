import Image from 'next/image'
import styles from './index.module.css'
import { useRef, useState } from 'react'
import { MdDriveFolderUpload } from 'react-icons/md'
import { Get } from '../Basket/Actions'
import Router from 'next/router'

const Payment: React.FC = () => {
  const src = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>()
  const [sending, setSending] = useState<boolean>(false)
  const uploadImage = () => {
    const imageFiles =
      src.current instanceof HTMLInputElement && src.current.files
        ? src.current.files
        : null
    if (imageFiles && imageFiles.length > 0) {
      Array.from(imageFiles).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageData = reader.result?.toString().split(',')[1]
          imageData && setImage(imageData)
        }
        reader.readAsDataURL(file)
      })
    }
  }
  const createOrder = async () => {
    setSending(true)
    const response = await fetch('/api/data/Shop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: Get()[0],
        attachment: image,
        authType: 'S&H!O*P^I$N#G$T^I@M*E',
      }),
    })
    const result = await response.json()
    result && setSending(false)
    if (response.status === 200) {
      Router.push('/profile')
      // toast.success('درخواست با موفقیت ثبت شد')
    } else {
      // toast.error('خطا')
      console.log(result.message)
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image
            src={'/images/mellat.png'}
            alt='bank card'
            width={777}
            height={444}
            className={styles.cardImage}
          />
          <div
            className={styles.cardDetails}
            onClick={() => navigator.clipboard.writeText('6104 3389 3872 7407')}
          >
            <p className={styles.cardNumber}> 6104 3389 3872 7407</p>
            <p className={styles.cardName}> علیرضا فشکی اکبری</p>
            {/* 6362 1411 3463 9104 */}
          </div>
        </div>
        <div className={styles.descriptions}>
          <p>
            لطفا 20 درصد از مبلغ فاکتور را واریز و عکس آن را ارسال فرمایید .
            {sending ? (
              <div>sending...</div>
            ) : (
              image && (
                <div className={styles.send}>
                  <p onClick={createOrder}>ارسال</p>
                </div>
              )
            )}
          </p>
          <div className={styles.fileInputContainer}>
            <input
              ref={src}
              className={styles.fileInput}
              placeholder={'ارسال فیش'}
              type={'file'}
              onChange={() => uploadImage()}
            />
            <MdDriveFolderUpload className={styles.upload} />
            {image && (
              <Image
                src={`data:image/jpeg;base64,${image}`}
                alt={'فیش بانکی'}
                width={99}
                height={99}
                className={styles.image}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Payment
