import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import styles from './index.module.css'
import { useState, useRef, useEffect } from 'react'
import { Information } from '@/Interfaces'
import dynamic from 'next/dynamic'
import { MdAdd } from 'react-icons/md'

const Map = dynamic(() => import('./map'), {
  ssr: false,
})

interface Props {
  addresses: Information[]
}

const Address: React.FC<Props> = ({ addresses }) => {
  const [newmew, setNewmew] = useState<[string, number, number] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const labels = [
    'آدرس',
    'کد پستی',
    'پلاک',
    'واحد',
    'عرض جغرافیایی',
    'طول جغرافیایی',
  ]
  const inputRef = useRef<HTMLInputElement>(null)

  // Ensure addresses is an array
  useEffect(() => {
    if (!Array.isArray(addresses)) {
      console.error('addresses is not an array', addresses)
    }
  }, [addresses])

  return (
    <>
      <div className={styles.container}>
        {Array.isArray(addresses) &&
          addresses.length > 0 &&
          addresses.map((address, idx) => (
            <div key={idx} className={styles.detailBox}>
              <div className={styles.addressHeader}>آدرس شماره {idx + 1}</div>
              {labels.map((label, index) => (
                <div key={index} className={styles.detailRow}>
                  <BiSolidMessageSquareEdit
                    className={styles.iconedit}
                    onClick={() =>
                      setNewmew([newmew ? newmew[0] : '', index, idx])
                    }
                  />
                  <div
                    className={styles.innerRow}
                    onClick={() =>
                      setNewmew([newmew ? newmew[0] : '', index, idx])
                    }
                  >
                    <label>{label}:</label>
                    <p>
                      {newmew && newmew[1] === index && newmew[2] === idx ? (
                        <input
                          ref={inputRef}
                          value={newmew[0]}
                          placeholder={`${
                            index === 0
                              ? address.address
                              : index === 1
                              ? address.zipCode
                              : index === 2
                              ? address.houseNumber
                              : index === 3
                              ? address.houseUnit
                              : index === 4
                              ? address.lat
                              : address.long
                          }`}
                          className={styles.onput}
                          onChange={(e) =>
                            setNewmew([e.target.value, index, idx])
                          }
                        />
                      ) : index === 0 ? (
                        address.address
                      ) : index === 1 ? (
                        address.zipCode
                      ) : index === 2 ? (
                        address.houseNumber
                      ) : index === 3 ? (
                        address.houseUnit
                      ) : index === 4 ? (
                        <Map data={[address.lat, address.long]} />
                      ) : (
                        <Map data={[address.lat, address.long]} />
                      )}
                    </p>
                  </div>
                  {newmew && newmew[1] === index && newmew[2] === idx && (
                    <>
                      {loading && <div className={styles.loading}></div>}
                      <input
                        value='ثبت'
                        type='submit'
                        // onClick={() => meow(idx)}
                        className={styles.submit}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        <div className={styles.addBox}>
          <p onClick={()=>''}>+</p>
        </div>
      </div>
    </>
  )
}

export default Address

// const meow = async (index: number) => {
//   setLoading(true)
//   try {
//     const response = await fetch('/api/data/Post/Client/userinfo', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         authType: 'C%L&i&E^ne^D%A$UtR',
//         address:
//           newmew && newmew[1] === 0 && newmew[2] === index
//             ? newmew[0]
//             : addresses[index].address,
//         zipCode:
//           newmew && newmew[1] === 1 && newmew[2] === index
//             ? newmew[0]
//             : addresses[index].zipCode,
//         houseNumber:
//           newmew && newmew[1] === 2 && newmew[2] === index
//             ? newmew[0]
//             : addresses[index].houseNumber,
//         houseUnit:
//           newmew && newmew[1] === 3 && newmew[2] === index
//             ? newmew[0]
//             : addresses[index].houseUnit,
//       }),
//     })
//     await response.json()
//     location.reload()
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
//   setLoading(false)
// }
