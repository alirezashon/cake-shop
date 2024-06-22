import { FormEvent, RefObject, useRef, useState } from 'react'
import styles from './index.module.css'
import { InsertNumber, sendOTP } from './handler'
import { Toast } from 'primereact/toast'
import Image from 'next/image'

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)

  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>
  } = {
    phone: useRef<HTMLInputElement>(null),
    otp: useRef<HTMLInputElement>(null),
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!otpSent) {
      sendOTP(`${refs.phone.current?.value}`, toast,setOtpSent)
    } else {
      await InsertNumber(
        setIsLoading,
      `${refs.phone.current?.value}`,
       `${refs.otp.current?.value}`,
        toast
      )
    }
  }
  return (
    <>
      <Toast ref={toast} />
      <div className={styles.container}>
        <div className={styles.formBox}>
          <Image
            alt=''
            className={styles.image}
            src={'/images/icon.png'}
            width={777}
            height={777}
          />
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={refs.phone as RefObject<HTMLInputElement>}
              placeholder={'شماره تماس'}
              type={'text'}
            />
            {otpSent && (
              <>
                <input
                  ref={refs.otp as RefObject<HTMLInputElement>}
                  placeholder={'کد ارسال شده'}
                  dir='rtl'
                  type={'number'}
                />
                <div className={styles.sendAgain}>ارسال مجدد</div>
              </>
            )}
            <input
              className={styles.submit}
              type='submit'
              value={!otpSent ? 'ارسال کد' : 'ثبت نام'}
            />
          </form>
        </div>
      </div>
    </>
  )
}
export default Login
