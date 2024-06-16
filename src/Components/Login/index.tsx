import { SignUp, SignIn } from '../Auth'
import { FormEvent, RefObject,  useRef, useState } from 'react'
import styles from './index.module.css'
import { UpdateAddress, InsertNumber } from '../FlowChart/address/handler'
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
    toast.current?.show({
      severity: 'info',
      summary: 'در حال اجرا',
      detail: 'سرور در حال پردازش',
      life: 3000,
    })
    if (!otpSent) {
      const phoneNumber = refs.phone.current?.value || ''
      if (phoneNumber.toString()?.length !== 11) {
        toast.current?.show({
          severity: 'error',
          summary: 'شماره تماس اشتباه است',
          detail: 'ناموفق',
          life: 3000,
        })
      } else {
        setOtpSent(true)
        toast.current?.show({
          severity: 'success',
          summary: 'کد برای شماره ارسال شد',
          detail: 'موفق',
          life: 3000,
        })
      }
    } else {
      const status = await InsertNumber(
        setIsLoading,
        parseInt(`${refs.phone.current?.value}`),
        parseInt(`${refs.otp.current?.value}`)
      )
      if (status === 'S!A@k%s$e^x%f^u*l^') {
        toast.current?.show({
          severity: 'success',
          summary: 'ثبت نام با موفقیت انجام شد',
          detail: 'موفق',
          life: 3000,
        })
      }
    }
  }
  return (
    <>
	<Toast ref={toast}/>
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
              <input
                ref={refs.otp as RefObject<HTMLInputElement>}
                placeholder={'کد ارسال شده'}
                dir='rtl'
                type={'number'}
              />
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
