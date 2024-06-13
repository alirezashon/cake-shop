/** @format */

import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import Map from '../../Map'
import { UpdateAddress, InsertNumber } from './handler'
import { Toast } from 'primereact/toast'
import Image from 'next/image'

interface MapData {
  address: string
  houseNumber: number
  houseUnit: number
}

const Information: React.FC = () => {
  const [mapData, setMapData] = useState<MapData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [login, setLogin] = useState<[boolean, boolean]>([false, false]) //[number, address]

  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>
  } = {
    phone: useRef<HTMLInputElement>(null),
    otp: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    houseNumber: useRef<HTMLInputElement>(null),
    houseUnit: useRef<HTMLInputElement>(null),
  }
  const getAddress = (data: MapData) => {
    setMapData(data)
  }
  const updateAddress = async (e: FormEvent) => {
    const status = UpdateAddress(
      setIsLoading,
      parseInt(`${refs.phone.current?.value}`),
      parseInt(`${mapData?.houseNumber}`),
      parseInt(`${mapData?.houseUnit}`),
      `${mapData?.address}`,
      toast
    )
    e.preventDefault()
    setLogin([true, true])
  }

  useEffect(() => {
    const storedUserString = localStorage.getItem(
      's(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi'
    )

    let storedUser = null
    if (storedUserString) {
      try {
        storedUser = JSON.parse(storedUserString)
      } catch (error) {
        localStorage.removeItem('s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi')
      }
    }

    if (storedUser) {
      if (storedUser.length === 23) {
        setLogin([true, false])
      } else if (storedUser.length === 33) {
        setLogin([true, true])
      }
    }
  }, [setLogin])

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
      if (phoneNumber.toString()?.length < 10) {
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
        setLogin([true, false])
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
      <Toast ref={toast} />
      <div className={styles.container}>
        {!login[0] && (
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
        )}
        {!login[1] && login[0] && (
          <div className={styles.mapBox}>
            <div className={styles.map}>
              <Map onDataChange={getAddress} />
            </div>
            <form
              className={styles.mapformBox}
              onSubmit={(e) => updateAddress(e)}
            >
              <div className={styles.mapformBoxRow}>
                <input
                  placeholder={'پلاک'}
                  type={'number'}
                  ref={refs.houseNumber as RefObject<HTMLInputElement>}
                />
                <input
                  placeholder={'واحد'}
                  type={'number'}
                  ref={refs.houseUnit as RefObject<HTMLInputElement>}
                />
              </div>
              <textarea
                placeholder={'آدرس'}
                ref={refs.houseUnit as RefObject<HTMLTextAreaElement>}
              ></textarea>
              <input
                style={{ width: '80%' }}
                className={styles.submit}
                type='submit'
                value={'ثبت آدرس'}
              />
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Information
