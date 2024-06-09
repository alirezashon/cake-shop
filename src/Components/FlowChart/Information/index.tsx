/** @format */

import { RefObject, useRef, useState } from "react"
import styles from "./index.module.css"
import Map from "../../Map"
import { Register } from "./handler"
interface MapData {
  address: string
  houseNumber: number
  houseUnit: number
  zipCode: number
}
interface Props {
  setRegistered: (registered: boolean) => void
}
const Information: React.FC<Props> = ({ setRegistered }) => {
  const [mapData, setMapData] = useState<MapData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const refs: {
    [key: string]: RefObject<HTMLInputElement>
  } = {
    phone: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    nationalCode: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  }
  const labels = ["شماره تماس", "نام", "رمز عبور", "کد ملی", "ایمیل"]
  const getAddress = (data: MapData) => {
    setMapData(data)
    console.log(mapData)
  }
  const register = async () => {
    if (mapData?.address.trim()) {
      if (refs.phone.current?.value) {
        if (refs.password.current?.value) {
          ;(await Register(
            setIsLoading,
            parseInt(refs.phone.current?.value),
            `${refs.name.current?.value}`,
            refs.password.current?.value,
            `${refs.nationalCode.current?.value}`,
            parseInt(`${mapData.houseNumber}`),
            parseInt(`${mapData.houseUnit}`),
            parseInt(`${mapData.zipCode}`),
            `${refs.email.current?.value}`,
            mapData.address
          )) === "S!A@k%s$e^x%f^u*l^" &&
            // toast.success('ثبت نام با موفقیت انجام شد')
            setRegistered(true)
        } else {
          // toast.warning('رمز عبور الزامیست')
        }
      } else {
        // toast.warning('شماره تلفن الزامیست')
      }
    } else {
      // toast.warning('اطلاعات آدرس کامل نمی باشد')
    }
  }
  return (
    <>
      <div onClick={register} className={styles.register}>
        <p>ثبت نام</p>
      </div>

      {isLoading ? (
        <div></div>
      ) : (
        <div className={styles.container}>
          <div className={styles.formBox}>
            {Object.keys(refs).map((refName, index) => (
              <div key={index} className={styles.formBoxRow}>
                <input
                  ref={refs[refName] as RefObject<HTMLInputElement>}
                  placeholder={labels[index]}
                  dir='rtl'
                  type={
                    refName === "phone"
                      ? "number"
                      : refName === "password"
                      ? "password"
                      : "text"
                  }
                />
              </div>
            ))}
          </div>
          <div className={styles.mapBox}>
            <Map onDataChange={getAddress} />
          </div>
        </div>
      )}
    </>
  )
}

export default Information
