import { FormEvent, RefObject, useRef, useState } from 'react'
import styles from './index.module.css'
import { Toast } from 'primereact/toast'
import dynamic from 'next/dynamic'
import { addAddress } from '@/Components/Profile/Address/handler'
import { BiSearch } from 'react-icons/bi'
import { SearchAddress, searchAddress } from './handler'

const Map = dynamic(() => import('./Map/index'), {
  ssr: false,
})

const Add: React.FC = () => {
  const [foundAddresses, setFoundAddresses] = useState<SearchAddress[]>([])
  const [mapData, setMapData] = useState<[number, number]>([
    35.72249924640049, 51.335191350784214,
  ])
  const [address, setAddress] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const toast = useRef<Toast>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>
  } = {
    houseNumber: useRef<HTMLInputElement>(null),
    search: useRef<HTMLInputElement>(null),
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
    addAddress(toast, information)
  }

  const handleSearchChange = async () => {
    const value = refs.search.current?.value ?? ''
    if (value.length > 2) {
      await searchAddress(value, setFoundAddresses)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSelectAddress = (selected: SearchAddress) => {
    setMapData([selected.y, selected.x])
    setAddress(selected.title)
    setShowDropdown(false)
  }

  return (
    <>
      <Toast ref={toast} />
      <div className={styles.container}>
        <form className={styles.searchBar}>
          <input
            ref={refs.search as RefObject<HTMLInputElement>}
            className={styles.searchInput}
            type='search'
            placeholder={'جستجو ...'}
            onChange={handleSearchChange}
          />
          <BiSearch className={styles.searchIcon} />
          {showDropdown && (
            <div className={styles.dropdown}>
              {foundAddresses.map((item) => (
                <div
                  key={item.title}
                  className={styles.dropdownItem}
                  onClick={() => handleSelectAddress(item)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </form>
        <div className={styles.addressContainer}>
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
                value={address}
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
      </div>
    </>
  )
}
export default Add