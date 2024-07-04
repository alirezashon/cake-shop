/** @format */

import Link from 'next/link'
import styles from './index.module.css'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Items, items } from '../items'
import Image from 'next/image'
import Basket from '@/Components/Basket'
import { FaUserCircle } from 'react-icons/fa'
import { ProductInterface } from '../../../Interfaces'
import { BiSearch } from 'react-icons/bi'
import { ProgressSpinner } from 'primereact/progressspinner'

interface NavProps {
  basketData: ProductInterface[]
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}

const PC: React.FC<NavProps> = ({
  basketData,
  isBasketOpen,
  setIsBasketOpen,
}) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
  }
  const [openItemWind, setOpenItemWind] = useState<{
    th: number
    ex: number
  } | null>()
  const [loading, setLoading] = useState<boolean>(false)
  const [notindex, setNotindex] = useState<number>(0)

  const closeNav = (event: MouseEvent) => {
    const t = document.getElementById('openBox')
    if (openItemWind && !t?.contains(event.target as Node)) {
      setOpenItemWind(null)
    }
  }
  const closeNavOver = (event: MouseEvent) => {
    const t = document.getElementById('openBox')
    if (
      openItemWind &&
      window.innerHeight / 1.8 < event.clientY &&
      !t?.contains(event.target as Node)
    ) {
      setOpenItemWind(null)
    }
  }
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setNotindex((prevNumber) => {
          if (prevNumber === 3) {
            return 0
          } else {
            return prevNumber + 1
          }
        })
      }, 1000)

      return () => clearInterval(interval)
    }
    window.addEventListener('click', closeNav)
    window.addEventListener('mouseover', closeNavOver)

    return () => {
      window.removeEventListener('click', closeNav)
      window.removeEventListener('mouseover', closeNavOver)
    }
  }, [openItemWind, setOpenItemWind])

  return (
    <>
      {loading && (
        <ProgressSpinner
          style={{
            width: '5vh',
            height: '5vh',
            position: 'absolute',
            top: '45vh',
            left: '45vw',
          }}
          strokeWidth='2'
          animationDuration='.5s'
        />
      )}
      <nav className={styles.navBar}>
        <div className={styles.itemsBox}>
          <Image
            src={'/images/icon.png'}
            width={123}
            height={123}
            alt=''
            style={{ width: '22vh' }}
          />
             {items &&
            items.map((item:Items, itemIndex) => (
              <>
                <Link
                  key={itemIndex}
                  id={`${itemIndex === 3 && 'item'}`}
                  href={`/${item.link}`}
                  className={styles.item}
                  onMouseOver={() => setOpenItemWind({ ex: itemIndex, th: -1 })}
                >

                  {item.name}
                </Link>
                {itemIndex === openItemWind?.ex &&
                  Array.isArray(item.category) && (
                    <div className={styles.catypeBox} onMouseLeave={()=>setOpenItemWind(null)}>
                      <div
                        id='openBox'
                        className={styles.productsopenItemsBox}
                        style={{
                          left: `${
                            document.getElementById('item')?.offsetLeft
                          }px`,
                        }}
                      >
                        {item.category.map((subItem, subIndex) => (
                          <div
                            className={styles.productBox}
                            key={subIndex}
                            onMouseOver={() =>
                              setOpenItemWind({
                                ex: openItemWind.ex,
                                th: subIndex,
                              })
                            }
                          >
                            <Link
                              href={`/${subItem.name}`}
                              className={styles.products}
                            >
                              {subItem.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                      {openItemWind?.th !== -1 && (
                        <div className={styles.typeBox}>
                          {item?.category[openItemWind.th]?.type?.map(
                            (type, typeIndex) => (
                              <div className={styles.type} key={typeIndex}>
                                {type}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </>
            ))}
        </div>
        <div className={styles.leftSide}>
          <div className={styles.iconBox}>
            <Basket
              isBasketOpen={isBasketOpen}
              setIsBasketOpen={setIsBasketOpen}
              basketData={basketData}
            />

            <FaUserCircle
              className={styles.profile}
              onClick={() => {
                setLoading(true)
                window.location.href = '/profile'
              }}
            />
          </div>
          <div>
            {/* <form className={styles.searchBar}>
              <input
                ref={refs.search as RefObject<HTMLInputElement>}
                className={styles.searchInput}
                type='search'
                placeholder={'جستجو ...'}
              />
              <BiSearch className={styles.searchIcon} />
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}
export default PC
