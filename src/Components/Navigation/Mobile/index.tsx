/** @format */

import Link from "next/link"
import styles from "./index.module.css"
import { RefObject, useEffect, useRef, useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import Basket from "../../Basket"
import { ProductInterface } from "../../../Interfaces"
import { BiSearch } from "react-icons/bi"
import { Items, items } from '../items'


interface NavProps {
  basketData: ProductInterface[]
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}

const Mobile: React.FC<NavProps> = ({
  basketData,
  isBasketOpen,
  setIsBasketOpen,
}) => {
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
    window.addEventListener("click", closeNav)

    return () => {
      window.removeEventListener("click", closeNav)
    }
  }, [drawer, setDrawer])
  return (
    <>
      {loading && <div className={"loadingSpin"}></div>}
      {drawer ? (
        <div className={styles.drawer}>
          <div className={styles.searchBox}>
            <form className={styles.searchBar}>
              <input
                ref={refs.search as RefObject<HTMLInputElement>}
                className={styles.searchInput}
                type='search'
                placeholder={"جستجو ..."}
              />
              <BiSearch className={styles.searchIcon} />
            </form>
          </div>
          {items.map((item: Items, index) => (
            <div key={index} className={styles.itemBox}>
              <h5
                className={styles.item}
                onClick={() => setDrawer({ item: index, category: -1 })}
              >
                <Link
                  key={index}
                  href={`${item.category}`}
                  className={styles.products}
                >
                  {item.name}
                </Link>
              </h5>
              {drawer.item === index &&
                items[drawer.item].category?.map((data, subIndex) =>
                  typeof data === "string" ? (
                    <Link
                      key={subIndex}
                      href={`${item.category}/${
                        items[drawer.item].category
                      }/${data}`}
                    >
                      <h5 className={styles.options}>{`${data}`}</h5>
                    </Link>
                  ) : (
                    <div key={index}>
                      <h5
                        className={styles.category}
                        onClick={() =>
                          setDrawer({ item: index, category: subIndex })
                        }
                      >
                        <Link
                          key={subIndex}
                          href={`${item.category}/${data.name}`}
                          className={styles.products}
                        >
                          {data.name}
                        </Link>
                      </h5>
                      {subIndex === drawer.category &&
                        data.type?.map((subOption, subOptionIndex) => (
                          <Link
                            key={subOptionIndex}
                            href={`${item.category}/${data.type}/${subOption}`}
                            className={styles.products}
                          >
                            <h5
                              className={styles.subOptions}
                            >{`${subOption}`}</h5>
                          </Link>
                        ))}
                    </div>
                  )
                )}
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
            <div>
              <Basket
                isBasketOpen={isBasketOpen}
                setIsBasketOpen={setIsBasketOpen}
                basketData={basketData}
              />
            </div>
            <div>
              <FaUserCircle
                className={styles.profile}
                onClick={() => (window.location.href = "/profile")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Mobile
