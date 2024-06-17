import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import styles from './index.module.css'
import { useState, useRef, useEffect, RefObject, FormEvent } from 'react'
import { Information } from '@/Interfaces'
import dynamic from 'next/dynamic'
import {removeAddress} from './handler'
import { Toast } from 'primereact/toast'
import { MdDeleteSweep } from 'react-icons/md'
import Add from './add'

const Map = dynamic(() => import('./map'), {
  ssr: false,
})

interface Props {
  addresses: Information[] | null
}

const Address: React.FC<Props> = ({ addresses }) => {
  const [newmew, setNewmew] = useState<[string, number, number] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const labels = ['آدرس', 'کد پستی', 'پلاک', 'واحد']
  const addressRef: {
    [key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
  } = {
    address: useRef<HTMLInputElement>(null),
    houseNumber: useRef<HTMLInputElement>(null),
    houseUnit: useRef<HTMLInputElement>(null),
    zipCode: useRef<HTMLInputElement>(null),
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useRef<Toast>(null)


  
  const addresside = () => {
    return (
      <>
        {addresses?.map((address, idx) => (
          <div key={idx} className={styles.addresside}>
            <div className={styles.addressHeader}>
              آدرس شماره {idx + 1}
              <MdDeleteSweep
                className={styles.delete}
                onClick={async () => removeAddress(toast, `${address._id}`)}
              />
            </div>
            <Map data={[address.lat, address.long]} />
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
                            : address.houseUnit
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
                    ) : (
                      address.houseUnit
                    )}
                  </p>
                </div>
                {newmew && newmew[1] === index && newmew[2] === idx && (
                  <>
                    {loading && <div className={styles.loading}></div>}
                    <input
                      value='ثبت'
                      type='submit'
                      className={styles.submit}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </>
    )
  }
  return (
    <>
      <Toast ref={toast} />
      <div className={styles.container}>
        <>
          {addresside()}
          {!isAdding ? (
            <div className={styles.addBox}>
              <p onClick={() => setIsAdding(true)}>+</p>
            </div>
          ) : (
            <>
              <Add />
            </>
          )}
        </>
      </div>
    </>
  )
}

export default Address

// import { BiSolidMessageSquareEdit } from 'react-icons/bi'
// import styles from './index.module.css'
// import { useState, useRef, useEffect, RefObject, FormEvent } from 'react'
// import { Information } from '@/Interfaces'
// import dynamic from 'next/dynamic'
// import { addAddress } from '../handler'
// import { Toast } from 'primereact/toast'

// const Map = dynamic(() => import('./map'), {
//   ssr: false,
// })

// interface Props {
//   addresses: Information[] | null
// }

// const Address: React.FC<Props> = ({ addresses }) => {
//   const [newmew, setNewmew] = useState<[string, number, number] | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [isAdding, setIsAdding] = useState<boolean>(false)
//   const labels = ['آدرس', 'کد پستی', 'پلاک', 'واحد', 'نقشه']
//   const addressRef: {
//     [key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
//   } = {
//     address: useRef<HTMLInputElement>(null),
//     houseNumber: useRef<HTMLInputElement>(null),
//     houseUnit: useRef<HTMLInputElement>(null),
//     zipCode: useRef<HTMLInputElement>(null),
//     lat: useRef<HTMLInputElement>(null),
//     long: useRef<HTMLInputElement>(null),
//   }
//   const inputRef = useRef<HTMLInputElement>(null)
//   const toast = useRef<Toast>(null)

//   useEffect(() => {
//     console.table(addresses)
//   }, [addresses])

//   const addit = async (e: FormEvent) => {
//     e.preventDefault()
//     const information = {
//       address: addressRef.address.current?.value || '',
//       houseNumber: parseInt(`${addressRef.houseNumber.current?.value}`) || 0,
//       houseUnit: parseInt(`${addressRef.houseUnit.current?.value}`) || 0,
//       zipCode: parseInt(`${addressRef.zipCode.current?.value}`) || 0,
//       lat: parseInt(`${addressRef.lat.current?.value}`) || 0,
//       long: parseInt(`${addressRef.long.current?.value}`) || 0,
//     }
//     addAddress(toast, information)
//   }

//   return (
//     <>
//       <div className={styles.container}>
//         {addresses?.map((address, idx) => (
//           <div key={idx} className={styles.detailBox}>
//             <div className={styles.addressHeader}>آدرس شماره {idx + 1}</div>
//             {labels.map((label, index) => (
//               <div key={index} className={styles.detailRow}>
//                 <BiSolidMessageSquareEdit
//                   className={styles.iconedit}
//                   onClick={() =>
//                     setNewmew([newmew ? newmew[0] : '', index, idx])
//                   }
//                 />
//                 <div
//                   className={styles.innerRow}
//                   onClick={() =>
//                     setNewmew([newmew ? newmew[0] : '', index, idx])
//                   }
//                 >
//                   <label>{label}:</label>
//                   <p>
//                     {newmew && newmew[1] === index && newmew[2] === idx ? (
//                       <input
//                         ref={inputRef}
//                         value={newmew[0]}
//                         placeholder={`${
//                           index === 0
//                             ? address.address
//                             : index === 1
//                             ? address.zipCode
//                             : index === 2
//                             ? address.houseNumber
//                             : index === 3
//                             ? address.houseUnit
//                             : index === 4
//                             ? address.lat
//                             : address.long
//                         }`}
//                         className={styles.onput}
//                         onChange={(e) =>
//                           setNewmew([e.target.value, index, idx])
//                         }
//                       />
//                     ) : index === 0 ? (
//                       address.address
//                     ) : index === 1 ? (
//                       address.zipCode
//                     ) : index === 2 ? (
//                       address.houseNumber
//                     ) : index === 3 ? (
//                       address.houseUnit
//                     ) : (
//                       index === 4 && <Map data={[address.lat, address.long]} />
//                     )}
//                   </p>
//                 </div>
//                 {newmew && newmew[1] === index && newmew[2] === idx && (
//                   <>
//                     {loading && <div className={styles.loading}></div>}
//                     <input
//                       value='ثبت'
//                       type='submit'
//                       // onClick={() => meow(idx)}
//                       className={styles.submit}
//                     />
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//         {!isAdding ? (
//           <div className={styles.addBox}>
//             <p onClick={() => setIsAdding(true)}>+</p>
//           </div>
//         ) : (
//           <>
//             <form className={styles.addBox} onSubmit={(e) => addit(e)}>
//               {Object.keys(addressRef).map((refName, index) => (
//                 <div key={index} className={styles.productBoxRow}>
//                   <label>{refName}</label>
//                   <input
//                     ref={addressRef[refName] as RefObject<HTMLInputElement>}
//                     placeholder={refName}
//                     type='text'
//                   />
//                 </div>
//               ))}
//               <input className={styles.submit} type='submit' />
//             </form>
//           </>
//         )}
//       </div>
//     </>
//   )
// }

// export default Address

// // const meow = async (index: number) => {
// //   setLoading(true)
// //   try {
// //     const response = await fetch('/api/data/Post/Client/userinfo', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         authType: 'C%L&i&E^ne^D%A$UtR',
// //         address:
// //           newmew && newmew[1] === 0 && newmew[2] === index
// //             ? newmew[0]
// //             : addresses[index].address,
// //         zipCode:
// //           newmew && newmew[1] === 1 && newmew[2] === index
// //             ? newmew[0]
// //             : addresses[index].zipCode,
// //         houseNumber:
// //           newmew && newmew[1] === 2 && newmew[2] === index
// //             ? newmew[0]
// //             : addresses[index].houseNumber,
// //         houseUnit:
// //           newmew && newmew[1] === 3 && newmew[2] === index
// //             ? newmew[0]
// //             : addresses[index].houseUnit,
// //       }),
// //     })
// //     await response.json()
// //     location.reload()
// //   } catch (error) {
// //     console.error('Error fetching data:', error)
// //   }
// //   setLoading(false)
// // }
