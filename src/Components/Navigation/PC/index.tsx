/** @format */

import Link from "next/link"
import styles from "./index.module.css"
import { RefObject, useEffect, useRef, useState } from "react"
import { items } from "../items"
import Image from "next/image"
import Basket from "@/Components/Basket"
import { FaUserCircle } from "react-icons/fa"
import { Product } from "../../../DTO"
import { BiSearch } from "react-icons/bi"

interface Items {
  category: string
  brands: string[] | subOption[]
}
interface subOption {
  brand: string
  products: string[]
}
interface NavProps {
  basketData: Product[]
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

  const loadingo = [
    "در حال بارگیری",
    ". در حال بارگیری",
    ". . در حال بارگیری",
    ". . . در حال بارگیری",
  ]
  const openItemBox = (th: number, ex: number) => {
    setOpenItemWind({ th: th, ex: ex })
  }

  const closeNav = (event: MouseEvent) => {
    const t = document.getElementById("openBox")
    if (openItemWind && !t?.contains(event.target as Node)) {
      setOpenItemWind(null)
    }
  }
  const closeNavOver = (event: MouseEvent) => {
    const t = document.getElementById("openBox")
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
    window.addEventListener("click", closeNav)
    window.addEventListener("mouseover", closeNavOver)

    return () => {
      window.removeEventListener("click", closeNav)
      window.removeEventListener("mouseover", closeNavOver)
    }
  }, [openItemWind, setOpenItemWind])

  return (
    <>
      {loading && (
        <div className={"loadingSpin"}>
          <p>{loadingo[notindex]}</p>
        </div>
      )}
      <nav className={styles.navBar}>
        <div className={styles.itemsBox}>
          <Image src={"/images/icon.png"} width={55} height={55} alt='' />
          {items &&
            items.map((item: Items, itemIndex) => (
              <Link
                key={itemIndex}
                href={`/${item.category}`}
                className={styles.item}
                onMouseOver={() =>
                  openItemBox(
                    typeof item.brands[0] === "object"
                      ? (window.innerWidth * 13) / 100 +
                          ((window.innerWidth * 13) / 100) * item.brands.length
                      : (window.innerWidth * 22) / 100,
                    itemIndex
                  )
                }
              >
                {item.category}
              </Link>
            ))}
          {openItemWind &&
            items.map(
              (item, index) =>
                index === openItemWind.ex &&
                Array.isArray(item.brands) && (
                  <div
                    id='openBox	'
                    className={styles.productsopenItemsBox}
                    style={{
                      width: `${openItemWind.th}px`,
                      right: `${index * 12}vw`,
                      display: `${
                        typeof item.brands[0] === "object" ? "flex" : "block"
                      }`,
                    }}
                    key={index}
                  >
                    {item.brands.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        {typeof option === "string" ? (
                          <div className={styles.productBox}>
                            <Link
                              href={`${item.category}/${option}`}
                              className={styles.products}
                            >
                              {option}
                            </Link>
                          </div>
                        ) : (
                          <div className={styles.categoryBox}>
                            <Link
                              key={optionIndex}
                              href={`${item.category}/${option.brand}`}
                              className={`${styles.productop} ${styles.products} `}
                            >
                              <h6>{option.brand}</h6>
                            </Link>
                            {option.products.map(
                              (subOption, subOptionIndex) => (
                                <Link
                                  key={subOptionIndex}
                                  href={`${item.category}/${option.brand}/${subOption}`}
                                  className={styles.producto}
                                >
                                  {subOption}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
            )}
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
                window.location.href = "/profile"
              }}
            />
          </div>
          <div>
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
        </div>
      </nav>
    </>
  )
}
export default PC
