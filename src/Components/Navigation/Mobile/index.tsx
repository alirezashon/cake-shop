/** @format */

import Link from 'next/link'
import styles from './index.module.css'
import { RefObject, useEffect, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import Basket from '../../Basket'
import { ProductInterface } from '../../../Interfaces'
import { BiSearch } from 'react-icons/bi'
import { Items, items } from '../items'
import { BsSuitHeart } from 'react-icons/bs'

interface NavProps {
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}

const Mobile: React.FC<NavProps> = ({ isBasketOpen, setIsBasketOpen }) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
  }
  const [drawer, setDrawer] = useState<{
    item: number
    category: number
  } | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const closeNav = (event: MouseEvent) => {
    if (drawer !== null && event.clientX > window.innerWidth * 0.4) {
      setDrawer(null)
    }
  }
  useEffect(() => {
    window.addEventListener('click', closeNav)

    return () => {
      window.removeEventListener('click', closeNav)
    }
  }, [drawer, setDrawer])

  const toggleDrawerItem = (index: number) => {
    setDrawer((prevDrawer) => {
      if (prevDrawer?.item === index) {
        return { ...prevDrawer, item: -1, category: -1 }
      }
      return { item: index, category: -1 }
    })
  }

  const toggleDrawerCategory = (itemIndex: number, categoryIndex: number) => {
    setDrawer((prevDrawer) => {
      if (
        prevDrawer?.item === itemIndex &&
        prevDrawer?.category === categoryIndex
      ) {
        return { ...prevDrawer, category: -1 }
      }
      return { item: itemIndex, category: categoryIndex }
    })
  }

  return (
    <>
      {drawer ? (
        <div className={styles.drawer}>
          <div className={styles.searchBox}>
            <form className={styles.searchBar}>
              <input
                ref={refs.search as RefObject<HTMLInputElement>}
                className={styles.searchInput}
                type='search'
                placeholder={'جستجو ...'}
              />
              <BiSearch className={styles.searchIcon} />
            </form>
          </div>
          {items.map((item: Items, index) => (
            <div key={index} className={styles.itemBox}>
              <div
                className={styles.item}
                onClick={() => toggleDrawerItem(index)}
              >
                <Link
                  rel='noopener noreferrer'
                  target='_blank'
                  key={index}
                  href={`/Store#${item.name}`}
                  className={styles.product}
                >
                  {item.name}
                </Link>
                {item.category && (
                  <p className={styles.directionIcon}>&#x2BC6;</p>
                )}
              </div>
              {drawer.item === index &&
                items[drawer.item]?.category?.map((data, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/${item.category}/${
                      items[drawer.item].category
                    }/${data}`}
                  >
                    <h5 className={styles.options}>{`${data}`}</h5>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.navBar}>
          <div
            className={styles.navIcon}
            onClick={() => setDrawer({ item: -1, category: -1 })}
          >
            <p>☰</p>
          </div>

          <div className={styles.iconBox}>
            <Basket
              isBasketOpen={isBasketOpen}
              setIsBasketOpen={setIsBasketOpen}
            />

            <FaUserCircle
              className={styles.profile}
              onClick={() => (window.location.href = '/profile')}
            />
            <BsSuitHeart
              className={styles.profile}
              onClick={() => open('/favorites')}
            />
          </div>
        </div>
      )}
    </>
  )
}
export default Mobile
