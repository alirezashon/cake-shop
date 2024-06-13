/** @format */

import Image from 'next/image'
import Address from './Address'
import Chat from './Chat'
import Notification from './Notifications'
import styles from './index.module.css'
import { useState, useEffect, useRef } from 'react'
import Orders from './Orders'
import Favorites from './Favorites'
import LastSeen from './LastSeen'
import { Information, Order } from '@/Interfaces'
import { BiEdit } from 'react-icons/bi'
import { GiCrossMark } from 'react-icons/gi'

interface Info {
  email: string
  name: string
  nationalCode: string
  phone: number
}

interface Data {
  info: Info
  addr: Information[]
}

const keyTranslations: { [key: string]: string } = {
  email: 'ایمیل',
  name: 'نام',
  nationalCode: 'کد ملی',
  phone: 'شماره تلفن',
  address: 'آدرس',
  houseNumber: 'شماره خانه',
  houseUnit: 'واحد خانه',
  zipCode: 'کد پستی',
  lat: 'عرض جغرافیایی',
  long: 'طول جغرافیایی',
}

const Profile = () => {
  const [state, setState] = useState('سفارشات')
  const [data, setData] = useState<[Order[], Data] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newmew, setNewmew] = useState<[string | number, number] | null>(null)
  const [updating, setUpdating] = useState<boolean>(false)

  const refs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const items = [
    'سفارشات',
    'مورد علاقه',
    'گفتگو',
    'آدرس ها',
    'بازدید های اخیر',
    'پیغام ها',
  ]

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data/Post/Client/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: '(k*i)o&R^D&e$r#o@l!A$n%S*o(7)',
        }),
      })
      const responseData = await response.json()
      setData([responseData.orders, responseData.clientDatashow])
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const meow = async () => {
    setUpdating(true)
    try {
      const response = await fetch('/api/data/Post/Client/userinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: 'C%L&i&E^ne^D%A$UtR',
          email: newmew && newmew[1] === 0 ? newmew[0] : '',
          name: newmew && newmew[1] === 1 ? newmew[0] : '',
          nationalCode: newmew && newmew[1] === 2 ? newmew[0] : '',
          phone: newmew && newmew[1] === 3 ? newmew[0] : '',
        }),
      })
      await response.json()
      location.reload()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setUpdating(false)
  }

  useEffect(() => {
    if (!data) {
      fetchData()
    }
  }, [setData])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileBox}>
          <Image
            alt=''
            className={styles.image}
            src={'/images/icon.png'}
            width={111}
            height={111}
          />
          <div className={styles.profiletail}>
            {data &&
              Object.entries(data[1].info).map(([key, value], index) => (
                <div key={index}>
                  <div
                    className={styles.detailRow}
                    key={index}
                    onClick={() => value && setNewmew([String(value), index])}
                  >
                    <span>{keyTranslations[key]}</span>
                    {index !== (newmew ? newmew[1] : -1) && (
                      <>
                        <span>{value}</span>
                        <BiEdit className={styles.editIcon} />
                      </>
                    )}
                    {newmew && newmew[1] === index && (
                      <div className={styles.editRow}>
                        <input
                          ref={(el) => {
                            refs.current[key] = el
                          }}
                          defaultValue={newmew[0] as string}
                          placeholder={String(value)}
                          className={styles.onput}
                          onChange={(e) => setNewmew([e.target.value, index])}
                        />
                        <input
                          value='ثبت'
                          type='submit'
                          onClick={async () => {
                            await meow()
                          }}
                          className={styles.submit}
                        />
                        <GiCrossMark
                          onClick={() => setNewmew(null)}
                          className={styles.close}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.itemsBox}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`${item === state ? styles.selected : styles.item} `}
                onClick={() => setState(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {state === 'سفارشات' ? (
          <Orders orders={data && data[0]} loading={isLoading} />
        ) : state === 'مورد علاقه' ? (
          <Favorites />
        ) : state === 'گفتگو' ? (
          <Chat />
        ) : state === 'آدرس ها' ? (
          data && <Address addresses={data[1]?.addr} />
        ) : state === 'بازدید های اخیر' ? (
          <LastSeen />
        ) : (
          state === 'پیغام ها' && <Notification />
        )}
      </div>
    </>
  )
}

export default Profile
