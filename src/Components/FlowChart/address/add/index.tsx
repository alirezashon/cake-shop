import { FormEvent, RefObject, useRef, useState } from 'react'
import styles from '../index.module.css'
import { Toast } from 'primereact/toast'
import dynamic from 'next/dynamic'
import { addAddress } from '@/Components/Profile/Address/handler'

const Map = dynamic(() => import('../Map/index'), {
  ssr: false,
})
const Add: React.FC = () => {
  const [mapData, setMapData] = useState<[number, number]>([35.7269, 51.52484])
  const [address, setAddress] = useState<string>('')
  const [login, setLogin] = useState<[boolean, boolean]>([false, false]) //[number, address]

  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>
  } = {
    houseNumber: useRef<HTMLInputElement>(null),
    zipCode: useRef<HTMLInputElement>(null),
    houseUnit: useRef<HTMLInputElement>(null),
  }

  const updateAddress = async (e: FormEvent) => {
    e.preventDefault()

    const information = {
      address: address,
      houseNumber: parseInt(`${refs.houseNumber.current?.value}`),
      houseUnit: parseInt(`${refs.houseUnit.current?.value}`),
      zipCode: parseInt(`${refs.zipCode.current?.value}`),
      lat: mapData[0],
      long: mapData[1],
    }
    console.log(information)
    addAddress(toast, information)
    setLogin([true, true])
  }

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.container}>
        <div className={styles.mapBox}>
          <div className={styles.map}>
            <Map
              coord={mapData}
              setCoord={setMapData}
              setAddress={setAddress}
            />
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
              value={address && address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <input
              style={{ width: '80%' }}
              className={styles.submit}
              type='submit'
              value={'ثبت آدرس'}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Add
