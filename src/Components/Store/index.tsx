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
import { generateSEO } from './SEO'
import { NextSeo } from 'next-seo'
import { useProducts } from '@/Context/Products'
import { io } from 'socket.io-client'

interface Props {
  category: Category[]
  total: number
}
const Store: React.FC<Props> = ({ category, total }) => {
  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    categoryBoxRef: useRef<HTMLDivElement>(null),
  }
  const { products } = useProducts()
  const { basket, setBasket } = useBasket()
  const [sortedata, setSortedata] = useState<ProductInterface[]>(products)
  const [productover, setProductover] = useState<number | null>(null)
  const [enginConf, setEnginConf] = useState<[number, number] | null>(null) //open state , selected option
  const [favorites, setFavorites] = useState<string[]>([])

  const connecTocket = () => {
    const socket = io({
      path: '/api/socket/Store',
    })
    socket.emit('getStore', { authType: '(m&n)w%I@t!n^O%l%a&v*E)' })
    socket.on('product', (product: ProductInterface) => {
      setSortedata((prevProducts) => [...prevProducts, product])
    })
    socket.on('done', () => {
      socket.disconnect()
    })
    socket.on('unauthorized', (message: string) => {
      socket.disconnect()
    })
    socket.on('error', (message: string) => {
      socket.disconnect()
    })
    return () => {
      socket.disconnect()
    }
  }
  useEffect(() => {
    connecTocket()
    setFavorites(GetFave())
    setBasket(Get())

    const handleHashChange = () => {
      const categoryTag = decodeURIComponent(window.location.hash.substring(1))
      console.log(categoryTag)
      if (categoryTag) {
        const sortedProducts = [...products].sort((a, b) => {
          if (a.categories === categoryTag && b.categories !== categoryTag)
            return -1
          if (a.categories !== categoryTag && b.categories === categoryTag)
            return 1
          return 0
        })
        setSortedata(sortedProducts)
      } else {
        setSortedata(products)
      }
    }
    window.addEventListener('hashchange', handleHashChange, false)
    handleHashChange()
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false)
    }
  }, [setBasket, setFavorites, products])

  const scrollLeft = () => {
    if (refs.categoryBoxRef.current) {
      refs.categoryBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }

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
      {sortedata.length}
      <Toast />
      <div className={styles.container}>
        <div className={styles.menuSide}>
          <div className={styles.categoryBox} ref={refs.categoryBoxRef}>
            <IoIosArrowForward
              className={styles.leftDirection}
              onClick={scrollLeft}
            />
            {category?.map((cat, catindex) => (
              <div key={catindex} className={styles.category}>
                <Image
                  src={`data:image/jpeg;base64,${Buffer.from(cat.src).toString(
                    'base64'
                  )}`}
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
                <NextSeo {...generateSEO(product)} />
                <Image
                  priority
                  src={`data:image/jpeg;base64,
                   ${product.src}`}
                  onClick={() => open(`/Store/${product.title}`)}
                  alt={product.title}
                  style={{ opacity: productover === productindex ? 0.2 : 1 }}
                  width={712}
                  height={712}
                  className={styles.productimage}
                />
                {productover === productindex && (
                  <div
                    className={styles.productDescription}
                    onClick={() => open(`/Store/${product.title}`)}
                  >
                    {product.description}
                  </div>
                )}
                <p
                  className={styles.producTitle}
                  onClick={() => open(`/Store/${product.title}`)}
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
            {Array.apply(
              0,
              Array(
                Math.max(
                  0,
                  (Number.isFinite(total) ? total : 10) -
                    (sortedata && Array.isArray(sortedata)
                      ? sortedata.length
                      : 0)
                )
              )
            ).map((x, i) => (
              <div
                className={`${styles.product} ${styles.loadingPlaceholder}`}
                key={i}
              >
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
