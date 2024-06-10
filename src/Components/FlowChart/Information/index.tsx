/** @format */

import { FormEvent, RefObject, useEffect, useRef, useState } from "react"
import styles from "./index.module.css"
import Map from "../../Map"
import { UpdateAddress, InsertNumber } from "./handler"
import { Toast } from "primereact/toast"
import Image from "next/image"

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

  // const register = async () => {
  //   if (mapData?.address.trim()) {
  //     if (refs.phone.current?.value) {
  //       if (refs.password.current?.value) {
  //         ;(await UpdateAddress(
  //           setIsLoading,
  //           parseInt(refs.phone.current?.value),
  //           parseInt(`${mapData.houseNumber}`),
  //           parseInt(`${mapData.houseUnit}`),
  //           mapData.address
  //         )) === "S!A@k%s$e^x%f^u*l^" &&
  //           toast.current?.show({
  //             severity: "success",
  //             summary: "ثبت نام با موفقیت انجام شد",
  //             detail: "موفق",
  //             life: 3000,
  //           })
  //       } else {
  //         toast.current?.show({
  //           severity: "warn",
  //           summary: "موفق",
  //           detail: "رمز عبور الزامیست",
  //           life: 3000,
  //         })
  //       }
  //     } else {
  //       toast.current?.show({
  //         severity: "warn",
  //         summary: "موفق",
  //         detail: "شماره تلفن الزامیست",
  //         life: 3000,
  //       })
  //     }
  //   } else {
  //     toast.current?.show({
  //       severity: "warn",
  //       summary: "موفق",
  //       detail: "اطلاعات آدرس کامل نمی باشد",
  //       life: 3000,
  //     })
  //   }
  // }
  useEffect(() => {
    const storedUser = localStorage.getItem("s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi")
    if (storedUser) {
      setLogin([true, false])
    }
  }, [setLogin])
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!otpSent) {
      const phoneNumber = refs.phone.current?.value || ""
      if (phoneNumber.toString()?.length < 10) {
        toast.current?.show({
          severity: "error",
          summary: "شماره تماس اشتباه است",
          detail: "ناموفق",
          life: 3000,
        })
      } else {
        setOtpSent(true)
        toast.current?.show({
          severity: "success",
          summary: "کد برای شماره ارسال شد",
          detail: "موفق",
          life: 3000,
        })
      }
    } else {
      const status = await InsertNumber(
        setIsLoading,
        parseInt(`${refs.phone.current?.value}`),
        parseInt(`${refs.otp.current?.value}`)
      )
      if (status === "S!A@k%s$e^x%f^u*l^") {
        setLogin([true, false])
        toast.current?.show({
          severity: "success",
          summary: "ثبت نام با موفقیت انجام شد",
          detail: "موفق",
          life: 3000,
        })
      }
    }
  }
  return (
    <>
      <Toast ref={toast} />
      {isLoading ? (
        <div></div>
      ) : (
        <div className={styles.container}>
          {!login[0] && (
            <div className={styles.formBox}>
              <Image
                alt=''
                className={styles.image}
                src={"/images/icon.png"}
                width={777}
                height={777}
              />
              <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <input
                  ref={refs.phone as RefObject<HTMLInputElement>}
                  placeholder={"شماره تماس"}
                  dir='rtl'
                  type={"number"}
                />
                {otpSent && (
                  <input
                    ref={refs.otp as RefObject<HTMLInputElement>}
                    placeholder={"کد ارسال شده"}
                    dir='rtl'
                    type={"number"}
                  />
                )}
                <input
                  className={styles.submit}
                  type='submit'
                  value={!otpSent ? "ارسال کد" : "ثبت نام"}
                />
              </form>
            </div>
          )}
          {login[0] && (
            <div className={styles.mapBox}>
              <Map onDataChange={getAddress} />
              <div className={styles.mapformBox}>
                <div className={styles.mapformBoxRow}>
                  <input
                    placeholder={"پلاک"}
                    type={"number"}
                    ref={refs.houseNumber as RefObject<HTMLInputElement>}
                  />
                  <input
                    placeholder={"واحد"}
                    type={"number"}
                    ref={refs.houseUnit as RefObject<HTMLInputElement>}
                  />
                </div>
                <textarea
                  placeholder={"آدرس"}
                  ref={refs.houseUnit as RefObject<HTMLTextAreaElement>}
                ></textarea>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Information
