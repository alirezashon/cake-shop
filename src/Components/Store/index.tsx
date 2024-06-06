import styles from "./index.module.css"
import { BiSearch } from "react-icons/bi"
import { MdAddCircle, MdDeleteForever } from "react-icons/md"
import { IoIosArrowForward } from "react-icons/io"
import { useRef, useState, RefObject, useEffect } from "react"
import { Product, Category } from "@/DTO"
import Image from "next/image"
import { FaMinus } from "react-icons/fa"
import { Add, Get, Remove } from "../Basket/Actions"
import { useBasket } from "@/Context"
import { FaBasketShopping } from "react-icons/fa6"
import { GiCrossMark } from "react-icons/gi"

interface Props {
  data: [Category[], Product[]]
}
const Store: React.FC<Props> = ({ data }) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement>
  } = {
    search: useRef<HTMLInputElement>(null),
  }
  const { basket, setBasket } = useBasket()
  const [isMobile, setIsMobile] = useState<boolean>(true)
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(true)
  const categoryBoxRef = useRef<HTMLDivElement>(null)
  const [showProducto, setShowProducto] = useState<string>("")
  const [productover, setProductover] = useState<number | null>(null)

  useEffect(() => {
    innerWidth > 878 && setIsMobile(false)
  }, [])
  const scrollLeft = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: -100, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: 100, behavior: "smooth" })
    }
  }
  const increment = (id: string, price: number) => {
    Add(id, price)
    setBasket(Get())
  }

  const decrement = (id: string) => {
    Remove(id)
    setBasket(Get())
  }
  const count = 314
  const totalPrice = 3143137137
  const title = "شیرینی کره "

  return (
    <>
      <div className={styles.container}>
        {isBasketOpen && (
          <div className={styles.basketSide}>
            <div className={styles.basketHead}>
              <div>
                سبد خرید
                {`(${count})`}
              </div>
              <GiCrossMark
                className={styles.garbage}
                onClick={() => setIsBasketOpen(false)}
              />
            </div>
            {basket.map((product) => (
              <div className={styles.basketController}>
                <div className={styles.titlePrice}>
                  <p>
                    {/* {data[1][data[1].findIndex((d) => d._id === product)]?.title} */}
                  </p>
                  <MdDeleteForever className={styles.garbage} />

                  <p>
                    {`${totalPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    تومان
                  </p>
                </div>
                <div className={styles.priceaction}>
                  <MdAddCircle className={styles.inceriment} size={"3vh"} />
                  <p className={styles.total}>{count}</p>
                  <FaMinus className={styles.deceriment} size={"3vh"} />
                </div>
              </div>
            ))}
            <div className={styles.basketDetail}></div>
          </div>
        )}
        <div
          className={styles.menuSide}
          style={{ width:!isMobile? `${ isBasketOpen ? 67 : 90}%`:`${99}%` }}
        >
          <div className={styles.categoryBox} ref={categoryBoxRef}>
            <IoIosArrowForward
              className={styles.leftDirection}
              onClick={scrollLeft}
              style={{ left: `${isBasketOpen ? 32 : 5.5}%` }}
            />
            {data &&
              data[0].map((cat, catindex) => (
                <div key={catindex} className={styles.category}>
                  <Image
                    // src={`data:image/jpeg;base64,${obj.src}`}
                    src={cat.src}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className={styles.categorimage}
                  />
                  <div className={styles.categoryName}>{cat.name}</div>
                </div>
              ))}
            <IoIosArrowForward
              className={styles.rightDirection}
              onClick={scrollRight}
              style={{ right: `${isBasketOpen ? 2 : 5.5}%` }}
            />
          </div>
          <div className={styles.menuSearchBox}>
            <form className={styles.searchBar}>
              <input
                ref={refs.search as RefObject<HTMLInputElement>}
                className={styles.searchInput}
                type='search'
                placeholder={"جستجو ..."}
              />
              <BiSearch className={styles.searchIcon} />
            </form>
            <FaBasketShopping
              className={styles.basketIcon}
              onClick={() => setIsBasketOpen(!isBasketOpen)}
            />
          </div>
          <div className={styles.producto}>
            {data &&
              data[1].map((product, productindex) => (
                <div
                  key={productindex}
                  className={styles.product}
                  onMouseOver={() => setProductover(productindex)}
                  onMouseLeave={() => setProductover(null)}
                >
                  <Image
                    // src={`data:image/jpeg;base64,${obj.src}`}
                    src={product.src}
                    alt={product.title}
                    style={{ opacity: productover === productindex ? 0.2 : 1 }}
                    width={777}
                    height={777}
                    className={styles.productimage}
                  />
                  {productover === productindex && (
                    <div className={styles.productDescription}>
                      {product.description}
                    </div>
                  )}
                  <p className={styles.producTitle}>{product.title}</p>
                  <div className={"priceaction"}>
                    <div className={styles.controlBox}>
                      <MdAddCircle
                        className={styles.inceriment}
                        size={"3vh"}
                        onClick={() => increment(product._id, product.price)}
                      />
                      {product && basket[1]?.includes(product._id) ? (
                        <p className={styles.total}>
                          {parseInt(
                            `${
                              basket[0][basket[1]?.indexOf(product._id)].split(
                                "*2%2&7(7)5%5!1@2"
                              )[3]
                            }`
                          ) * product.price}
                        </p>
                      ) : null}
                      <FaMinus
                        className={styles.deceriment}
                        size={"3vh"}
                        onClick={() => decrement(product._id)}
                      />
                    </div>
                    <p className={styles.productprice}>{product.price}</p>
                  </div>
                  {showProducto === product._id && (
                    <div key={productindex} className={styles.productself}>
                      <p className={styles.producTitle}>{product.title}</p>
                      <Image
                        // src={`data:image/jpeg;base64,${obj.src}`}
                        src={product.src}
                        alt={product.title}
                        width={200}
                        height={200}
                        className={styles.productimage}
                      />
                      <p className={styles.productprice}>{product.price}</p>
                      <p className={styles.productprice}>
                        {product.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Store
