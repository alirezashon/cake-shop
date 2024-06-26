import Image from 'next/image'
import styles from './index.module.css'
import { useEffect, useRef, useState } from 'react'
import { MdDriveFolderUpload } from 'react-icons/md'
import { createOrder, getAddress } from './handler'
import { Toast } from 'primereact/toast'
import { Information } from '@/Interfaces'
import Address from '../Address'
import { ProgressSpinner } from 'primereact/progressspinner'
import { GiCrossMark } from 'react-icons/gi'

const Payment: React.FC = () => {
  const src = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>()
  const [sending, setSending] = useState<boolean>(false)
  const [addresses, setAddresses] = useState<Information[] | null>()
  const [loading, setLoading] = useState<boolean>()
  const [addingAddress, setAddingAddress] = useState<boolean>(false)

  const toast = useRef<Toast>(null)
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
  useEffect(() => {
    !addresses && getAddress(setAddresses, setLoading)
  }, [])
  return (
    <>
      <Toast />
      <div className={styles.container}>
        <div
          className={styles.addressBox}
          style={{ display: `${addingAddress ? 'block' : 'flex'}` }}
        >
          {addingAddress ? (
            <div className={styles.addAddressBox}>
              <p>ثبت آدرس</p>
              <GiCrossMark size={'4vh'} className={'cross'} onClick={()=>setAddingAddress(false)}/>
              <Address />
            </div>
          ) : (
            <div
              className={styles.addrAddBtn}
              onClick={() => setAddingAddress(true)}
            >
              افزودن آدرس جدید
            </div>
          )}
          {addresses?.length === 0 ? (
            <Address />
          ) : (
            <div className={styles.selectAddressBox}>
              <p>انتخاب آدرس</p>
              {loading ? (
                <ProgressSpinner
                  style={{ width: '5vh', height: '5vh' }}
                  strokeWidth='8'
                  fill='var(--surface-ground)'
                  animationDuration='.5s'
                />
              ) : (
                <select className={styles.selectList}>
                  {addresses?.map((addr) => (
                    <option>{addr.address}</option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
        <div className={styles.cardBox}>
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
              onClick={() =>
                navigator.clipboard.writeText('6104 3389 3872 7407')
              }
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
                <div>در حال ارسال...</div>
              ) : (
                image && (
                  <div className={styles.send}>
                    <p onClick={() => createOrder(setSending, image, toast)}>
                      ارسال
                    </p>
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
      </div>
    </>
  )
}
export default Payment
