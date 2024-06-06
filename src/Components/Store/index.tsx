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
import { searchEngine } from "./content"
import { GiCrossMark } from "react-icons/gi"
interface Props {
  data: [Category[], Product[]]
}
const Store: React.FC<Props> = ({ data }) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    categoryBoxRef: useRef<HTMLDivElement>(null),
  }
  const { basket, setBasket, total, setTotal } = useBasket()
  const [showProducto, setShowProducto] = useState<number | -1>(-1)
  const [productover, setProductover] = useState<number | null>(null)
  const [enginConf, setEnginConf] = useState<[number, number] | null>(null) //open state , selected option

  const scrollLeft = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: -100, behavior: "smooth" })
    }
  }
  useEffect(() => {
    setBasket(Get())
  }, [])

  const scrollRight = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: 100, behavior: "smooth" })
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
  const PriceAction = (product: string, fontSize: string) => {
    console.log(product)
    return (
      <div className={styles.priceAction}>
        <MdAddCircle
          className={styles.inceriment}
          size={fontSize}
          onClick={() =>
            increment(
              product.split("*2%2&7(7)5%5!1@2")[2],
              parseInt(product?.split("*2%2&7(7)5%5!1@2")[1])
            )
          }
        />
        <p className={styles.total}>{product.split("*2%2&7(7)5%5!1@2")[3]}</p>
        <FaMinus
          className={styles.deceriment}
          size={fontSize}
          onClick={() => decrement(product.split("*2%2&7(7)5%5!1@2")[2])}
        />
      </div>
    )
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.basketSide}>
          <div className={styles.basketHead}>
            <div>
              سبد خرید
              {total}
            </div>
            <MdDeleteForever className={styles.garbage} />
          </div>
          <div className={styles.basketDetail}>
            <p>هزینه ی کل</p>

            {`${
              basket[0]?.reduce((acc, d) => {
                const parts = d.split("*2%2&7(7)5%5!1@2")
                const prico = parseInt(parts[3]) * parseInt(parts[1])
                return acc + prico
              }, 0) || 0
            } تومان `}
          </div>
          <div className={styles.productInBasket}>
            {basket[0]?.map((product) => (
              <div className={styles.basketController}>
                <div className={styles.titlePrice}>
                  <p>
                    {`${
                      data &&
                      data[1][
                        data[1].findIndex(
                          (pro) =>
                            pro._id === product.split("*2%2&7(7)5%5!1@2")[2]
                        )
                      ]?.title
                    }`}
                  </p>
                  <p>
                    {`${
                      data &&
                      data[1][
                        data[1].findIndex(
                          (pro) =>
                            pro._id === product.split("*2%2&7(7)5%5!1@2")[2]
                        )
                      ]?.price
                    }`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    تومان
                  </p>
                </div>
                {PriceAction(product, "3vh")}
              </div>
            ))}
          </div>
          <button className={styles.buy}>تکمیل خرید</button>
        </div>
        <div className={styles.menuSide}>
          <div className={styles.categoryBox} ref={refs.categoryBoxRef}>
            <IoIosArrowForward
              className={styles.leftDirection}
              onClick={scrollLeft}
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
            <div className={styles.searchEngine}>
              {searchEngine?.map((parent, index) => (
                <>
                  <div
                    className={styles.searchIndex}
                    onMouseOver={() => setEnginConf([index, -1])}
                  >
                  </div>
                  {enginConf &&
                    enginConf[0] !== -1 &&
                    parent[1]?.map((option:string) => (
                      <div className={styles.enginoption}>{option}</div>
                    ))}
                </>
              ))}
            </div>
            <FaBasketShopping className={styles.basketicon} />
          </div>
          <div className={styles.producto}>
            {data[1][showProducto]?._id}
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
                    onClick={() => setShowProducto(productindex)}
                    src={product.src}
                    alt={product.title}
                    style={{ opacity: productover === productindex ? 0.2 : 1 }}
                    width={777}
                    height={777}
                    className={styles.productimage}
                  />
                  {productover === productindex && (
                    <div
                      className={styles.productDescription}
                      onClick={() => setShowProducto(productindex)}
                    >
                      {product.description}
                    </div>
                  )}
                  <p
                    className={styles.producTitle}
                    onClick={() => setShowProducto(productindex)}
                  >
                    {product.title}
                  </p>
                  <div className={styles.priceaction}>
                    <p className={styles.productprice}>
                      {product.price}
                      {" تومان "}
                    </p>
                    {product && basket[1]?.includes(product._id) ? (
                      PriceAction(
                        `${basket[0].find((d) => {
                          if (d.split("*2%2&7(7)5%5!1@2")[2] === product._id)
                            return d
                        })}`,
                        "5vh"
                      )
                    ) : (
                      <MdAddCircle
                        className={styles.inceriment}
                        size={"4vh"}
                        onClick={() => increment(product._id, product.price)}
                      />
                    )}
                  </div>
                </div>
              ))}
            {data[1][showProducto] && (
              <div className={styles.productself}>
                <GiCrossMark
                  onClick={() => setShowProducto(-1)}
                  className={styles.cross}
                />
                <p className={styles.producTitlef}>
                  {data[1][showProducto]?.title}
                </p>
                <Image
                  // src={`data:image/jpeg;base64,${obj.src}`}
                  src={data[1][showProducto]?.src}
                  alt={data[1][showProducto]?.title}
                  width={444}
                  height={444}
                  className={styles.productimagelf}
                />
                <p className={styles.productprice}>
                  {data[1][showProducto]?.price}
                  <div className={styles.pricactionself}>
                    {PriceAction(
                      `${basket[0].find((d) => {
                        if (
                          d.split("*2%2&7(7)5%5!1@2")[2] ===
                          data[1][showProducto]?._id
                        )
                          return d
                      })}`,
                      "5vh"
                    )}
                  </div>
                </p>
                <p className={styles.productDescriptelf}>
                  {data[1][showProducto]?.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Store
