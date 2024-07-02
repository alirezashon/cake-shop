import styles from './index.module.css'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { MdAddCircle, MdDeleteForever } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { useRef, useState, RefObject, useEffect } from 'react'
import { ProductInterface, Category } from '@/Interfaces'
import Image from 'next/image'
import { FaMinus } from 'react-icons/fa'
import { Add, Get, Remove } from '../Basket/Actions'
import { useBasket } from '@/Context/Basket'
import { FaBasketShopping } from 'react-icons/fa6'
import { searchEngine } from './content'
import { Toast } from 'primereact/toast'
import { BiSearch } from 'react-icons/bi'
import { GetFave, AddFave, RemoveFave } from './Favorites'
interface Props {
  data: [Category[], ProductInterface[]]
  total: number
}
const Store: React.FC<Props> = ({ data, total }) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    categoryBoxRef: useRef<HTMLDivElement>(null),
  }
  const { basket, setBasket } = useBasket()
  const [sortedata, setSortedata] = useState<ProductInterface[]>(data[1])
  const [showProducto, setShowProducto] = useState<ProductInterface | null>(
    null
  )
  const [productover, setProductover] = useState<number | null>(null)
  const [enginConf, setEnginConf] = useState<[number, number] | null>(null) //open state , selected option
  const [isMobile, setIsMobile] = useState(true)
  const [favorites, setFavorites] = useState<string[]>([])

  const toast = useRef<Toast>(null)
  const totalPages = Math.ceil(total / 25)

  const fetchAllProducts = async () => {
    for (let i = 2; i <= totalPages; i++) {
      const res = await fetch('/api/GET/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'G&E!T*P^R$O#D$U^C@T*S',
          page: i,
          limit: 25,
        }),
      })
      const result = await res.json()
      if (result.success) {
        setSortedata((prv) => [...prv, ...result.products])
      }
    }
  }

  useEffect(() => {
    if (sortedata.length !== total) {
      fetchAllProducts()
    }
  }, [total])

  const scrollLeft = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }
  useEffect(() => {
    setFavorites(GetFave())
    setBasket(Get())
    if (innerWidth < 777) {
      setIsMobile(true)
    }
    const handleResize = () => {
      setIsMobile(innerWidth <= 777)
    }

    handleResize()
    addEventListener('resize', handleResize)

    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollRight = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: 100, behavior: 'smooth' })
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
  const addfave = (id: string) => {
    AddFave(id)
    setFavorites(GetFave())
  }

  const removefave = (id: string) => {
    RemoveFave(id)
    setFavorites(GetFave())
  }
  const PriceAction = (product: string, fontSize: string) => {
    return (
      <div className={styles.priceAction}>
        <MdAddCircle
          className={styles.inceriment}
          size={fontSize}
          onClick={() =>
            increment(
              product.split('*2%2&7(7)5%5!1@2')[2],
              parseInt(product?.split('*2%2&7(7)5%5!1@2')[1])
            )
          }
        />
        <p className={styles.total}>{product.split('*2%2&7(7)5%5!1@2')[3]}</p>
        <FaMinus
          className={styles.deceriment}
          size={fontSize}
          onClick={() => decrement(product.split('*2%2&7(7)5%5!1@2')[2])}
        />
      </div>
    )
  }
  return (
    <>
      <Toast />
      <div className={styles.container}>
        {!isMobile && (
          <div className={styles.basketSide}>
            <div className={styles.basketHead}>
              <div>
                {basket[0]?.reduce((acc, d) => {
                  const parts = d.split('*2%2&7(7)5%5!1@2')
                  const prico = parseInt(parts[3])
                  return acc + prico
                }, 0) || 0}
                محصول در سبد خرید
              </div>
              <MdDeleteForever className={styles.garbage} />
            </div>
            <div className={styles.basketDetail}>
              <p>هزینه ی کل</p>

              {`${
                basket[0]?.reduce((acc, d) => {
                  const parts = d.split('*2%2&7(7)5%5!1@2')
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
                              pro._id === product.split('*2%2&7(7)5%5!1@2')[2]
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
                              pro._id === product.split('*2%2&7(7)5%5!1@2')[2]
                          )
                        ]?.price
                      }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      تومان
                    </p>
                  </div>
                  {PriceAction(product, '3vh')}
                </div>
              ))}
            </div>
            <button
              className={styles.buy}
              onClick={() => (location.href = '/newReq/pay')}
            >
              تکمیل خرید
            </button>
          </div>
        )}
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
                    loading='lazy'
                    src={`data:image/jpeg;base64,${cat.src}`}
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
                placeholder={'جستجو ...'}
              />
              <BiSearch className={styles.searchIcon} />
            </form>
            <div className={styles.searchEngine}>
              {searchEngine?.map((parent, index) => (
                <div
                  key={index}
                  className={styles.parentContainer}
                  onMouseOver={() => setEnginConf([index, -1])}
                >
                  {parent && Array.isArray(parent) && (
                    <div className={styles.searchIndex}>{parent[0]}</div>
                  )}
                  {enginConf &&
                    enginConf[0] === index &&
                    parent &&
                    Array.isArray(parent) &&
                    Array.isArray(parent[1]) && (
                      <div
                        className={styles.optionsContainer}
                        onMouseOver={() => setEnginConf([index, -1])}
                        onMouseOut={() => setEnginConf(null)}
                      >
                        {parent[1]?.map((option: string, subIndex) => (
                          <div
                            key={subIndex}
                            className={styles.enginoption}
                            onClick={() =>
                              parent[0] === 'قیمت' && option === 'گرانترین'
                                ? setSortedata(
                                    [...sortedata].sort(
                                      (a, b) => b.price - a.price
                                    )
                                  )
                                : setSortedata(
                                    [...sortedata].sort(
                                      (a, b) => a.price - b.price
                                    )
                                  )
                            }
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            <FaBasketShopping className={styles.basketicon} />
          </div>
          <div className={styles.producto}>
            {sortedata?.map((product, productindex) => (
              <div
                key={productindex}
                className={styles.product}
                onMouseOver={() => setProductover(productindex)}
                onMouseLeave={() => setProductover(null)}
              >
                <Image
                  loading='lazy'
                  src={`data:image/jpeg;base64,${Buffer.from(
                    product.src
                  ).toString('base64')}`}
                  onClick={() => setShowProducto(product)}
                  alt={product.title}
                  style={{ opacity: productover === productindex ? 0.2 : 1 }}
                  width={777}
                  height={777}
                  className={styles.productimage}
                />
                {productover === productindex && (
                  <div
                    className={styles.productDescription}
                    onClick={() => setShowProducto(product)}
                  >
                    {product.description}
                  </div>
                )}
                <p
                  className={styles.producTitle}
                  onClick={() => setShowProducto(product)}
                >
                  {product.title}
                </p>
                <div className={styles.priceaction}>
                  <p className={styles.productprice}>
                    {product.price}
                    {' تومان '}
                  </p>
                  {favorites.includes(product._id) ? (
                    <BsSuitHeartFill
                      className={styles.heartIcon}
                      onClick={() => removefave(product._id)}
                    />
                  ) : (
                    <BsSuitHeart
                      onClick={() => addfave(product._id)}
                      className={styles.heartIcon}
                    />
                  )}
                  {product && basket[1]?.includes(product._id) ? (
                    PriceAction(
                      `${basket[0].find((d) => {
                        if (d.split('*2%2&7(7)5%5!1@2')[2] === product._id)
                          return d
                      })}`,
                      '5vh'
                    )
                  ) : (
                    <MdAddCircle
                      className={styles.inceriment}
                      size={'4vh'}
                      onClick={() => increment(product._id, product.price)}
                    />
                  )}
                </div>
              </div>
            ))}
            {Array.apply(0, Array(total - sortedata.length)).map((x, i) => (
              <div className={`${styles.product} ${styles.loadingPlaceholder}`}>
                <div className={styles.productimage} />
                <div className={styles.productDescription} />
                <p className={styles.producTitle} />
                <div className={styles.priceaction} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Store
