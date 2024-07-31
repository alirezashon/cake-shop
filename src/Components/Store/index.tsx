import styles from './index.module.css'
import { useRef, useState, useEffect, useCallback, RefObject } from 'react'
import { ProductInterface, Category } from '@/Interfaces'
import { useProducts } from '@/Context/Products'
import { fetchProducts } from './handler'
import { NextSeo } from 'next-seo'
import ProductCard from './Card'
import CategoryList from './Category'
import { FaBasketShopping } from 'react-icons/fa6'
import { BiSearch } from 'react-icons/bi'
import { searchEngine } from './content'

interface Props {
  category: Category[]
}

const Store: React.FC<Props> = ({ category }) => {
  const { products } = useProducts()
  const [sortedata, setSortedata] = useState<ProductInterface[]>(products)
  const [productover, setProductover] = useState<number | null>(null)
  const [enginConf, setEnginConf] = useState<[number, number] | null>(null) //open state, selected option
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const categoryBoxRef = useRef<HTMLDivElement>(null)

  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
  } = {
    search: useRef<HTMLInputElement>(null),
    categoryBoxRef: useRef<HTMLDivElement>(null),
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        fetchProducts(sortedata.length / 10 + 1, setSortedata)
      }
    },
    [sortedata.length]
  )

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.7,
    })

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [handleObserver])

  useEffect(() => {
    if (sortedata.length === 0) fetchProducts(1, setSortedata)
  }, [sortedata.length])

  const scrollLeft = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }

  const handleNavigate = (path: string) => {
    window.open(path, '_blank')
  }

  return (
    <>
      <NextSeo title='Store' />
      <div className={styles.container}>
        <div className={styles.menuSide}>
          <CategoryList
            categories={category}
            categoryBoxRef={categoryBoxRef}
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
          />
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
            {sortedata.map((product, productIndex) => (
              <ProductCard
                key={productIndex}
                product={product}
                isHovered={productover === productIndex}
                onHover={(isHovered) =>
                  setProductover(isHovered ? productIndex : null)
                }
                onNavigate={handleNavigate}
              />
            ))}
            <div ref={loadMoreRef} className={styles.loadMore} />
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                className={`${styles.product} ${styles.loadingPlaceholder}`}
                key={i}
              >
                <div className={styles.productImagePlaceholder} />
                <div className={styles.productDescriptionPlaceholder} />
                <p className={styles.productTitlePlaceholder} />
                <div className={styles.priceActionPlaceholder} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Store
// import styles from './index.module.css'
// import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
// import { MdAddCircle, MdDeleteForever } from 'react-icons/md'
// import { IoIosArrowForward } from 'react-icons/io'
// import { useRef, useState, RefObject, useEffect } from 'react'
// import { ProductInterface, Category } from '@/Interfaces'
// import Image from 'next/image'
// import { FaMinus } from 'react-icons/fa'
// import { Add, Get, Remove } from '../Basket/Actions'
// import { useBasket } from '@/Context/Basket'
// import { FaBasketShopping } from 'react-icons/fa6'
// import { searchEngine } from './content'
// import { Toast } from 'primereact/toast'
// import { BiSearch } from 'react-icons/bi'
// import { GetFave, AddFave, RemoveFave } from './Favorites'
// import { generateSEO } from './SEO'
// import { NextSeo } from 'next-seo'
// import { useProducts } from '@/Context/Products'
// import { fetchProducts } from './handler'

// interface Props {
//   category: Category[]
// }
// const Store: React.FC<Props> = ({ category }) => {
//   const refs: {
//     [key: string]: RefObject<HTMLInputElement | HTMLDivElement>
//   } = {
//     search: useRef<HTMLInputElement>(null),
//     categoryBoxRef: useRef<HTMLDivElement>(null),
//   }
//   const { products } = useProducts()
//   const { basket, setBasket } = useBasket()
//   const [sortedata, setSortedata] = useState<ProductInterface[]>(products)
//   const [productover, setProductover] = useState<number | null>(null)
//   const [enginConf, setEnginConf] = useState<[number, number] | null>(null) //open state , selected option
//   const [favorites, setFavorites] = useState<string[]>([])

//   const handleScroll = () => {
//     screenTop > (innerHeight * 70) / 100 &&
//       fetchProducts(products.length / 10 + 1, setSortedata)
//   }
//   useEffect(() => {
//     sortedata.length === 0 && fetchProducts(1, setSortedata)
//     setFavorites(GetFave())
//     setBasket(Get())
//     addEventListener('scroll', handleScroll, false)

//     const handleHashChange = () => {
//       const categoryTag = decodeURIComponent(window.location.hash.substring(1))
//       console.log(categoryTag)
//       if (categoryTag) {
//         const sortedProducts = [...products].sort((a, b) => {
//           if (a.categories === categoryTag && b.categories !== categoryTag)
//             return -1
//           if (a.categories !== categoryTag && b.categories === categoryTag)
//             return 1
//           return 0
//         })
//         setSortedata(sortedProducts)
//       } else {
//         setSortedata(products)
//       }
//     }
//     addEventListener('hashchange', handleHashChange, false)
//     handleHashChange()
//     return () => {
//       removeEventListener('hashchange', handleHashChange, false)
//       removeEventListener('scroll', handleScroll, false)
//     }
//   }, [setBasket, setFavorites, products])

//   const scrollLeft = () => {
//     if (refs.categoryBoxRef.current) {
//       refs.categoryBoxRef.current.scrollBy({ left: -100, behavior: 'smooth' })
//     }
//   }

//   const scrollRight = () => {
//     if (refs.categoryBoxRef.current) {
//       refs.categoryBoxRef.current.scrollBy({ left: 100, behavior: 'smooth' })
//     }
//   }
//   const increment = (id: string, price: number) => {
//     Add(id, price)
//     setBasket(Get())
//   }

//   const decrement = (id: string) => {
//     Remove(id)
//     setBasket(Get())
//   }
//   const addfave = (id: string) => {
//     AddFave(id)
//     setFavorites(GetFave())
//   }

//   const removefave = (id: string) => {
//     RemoveFave(id)
//     setFavorites(GetFave())
//   }
//   const PriceAction = (product: string, fontSize: string) => {
//     return (
//       <div className={styles.priceAction}>
//         <MdAddCircle
//           className={styles.inceriment}
//           size={fontSize}
//           onClick={() =>
//             increment(
//               product.split('*2%2&7(7)5%5!1@2')[2],
//               parseInt(product?.split('*2%2&7(7)5%5!1@2')[1])
//             )
//           }
//         />
//         <p className={styles.total}>{product.split('*2%2&7(7)5%5!1@2')[3]}</p>
//         <FaMinus
//           className={styles.deceriment}
//           size={fontSize}
//           onClick={() => decrement(product.split('*2%2&7(7)5%5!1@2')[2])}
//         />
//       </div>
//     )
//   }

//   return (
//     <>
//       {sortedata.length}
//       <Toast />
//       <div className={styles.container}>
//         <div className={styles.menuSide}>
//           <div className={styles.categoryBox} ref={refs.categoryBoxRef}>
//             <IoIosArrowForward
//               className={styles.leftDirection}
//               onClick={scrollLeft}
//             />
//             {category?.map((cat, catindex) => (
//               <div key={catindex} className={styles.category}>
//                 <Image
//                   src={`data:image/jpeg;base64,${Buffer.from(cat.src).toString(
//                     'base64'
//                   )}`}
//                   alt={cat.name}
//                   width={200}
//                   height={200}
//                   className={styles.categorimage}
//                 />
//                 <div className={styles.categoryName}>{cat.name}</div>
//               </div>
//             ))}
//             <IoIosArrowForward
//               className={styles.rightDirection}
//               onClick={scrollRight}
//             />
//           </div>
//           <div className={styles.menuSearchBox}>
//             <form className={styles.searchBar}>
//               <input
//                 ref={refs.search as RefObject<HTMLInputElement>}
//                 className={styles.searchInput}
//                 type='search'
//                 placeholder={'جستجو ...'}
//               />
//               <BiSearch className={styles.searchIcon} />
//             </form>
//             <div className={styles.searchEngine}>
//               {searchEngine?.map((parent, index) => (
//                 <div
//                   key={index}
//                   className={styles.parentContainer}
//                   onMouseOver={() => setEnginConf([index, -1])}
//                 >
//                   {parent && Array.isArray(parent) && (
//                     <div className={styles.searchIndex}>{parent[0]}</div>
//                   )}
//                   {enginConf &&
//                     enginConf[0] === index &&
//                     parent &&
//                     Array.isArray(parent) &&
//                     Array.isArray(parent[1]) && (
//                       <div
//                         className={styles.optionsContainer}
//                         onMouseOver={() => setEnginConf([index, -1])}
//                         onMouseOut={() => setEnginConf(null)}
//                       >
//                         {parent[1]?.map((option: string, subIndex) => (
//                           <div
//                             key={subIndex}
//                             className={styles.enginoption}
//                             onClick={() =>
//                               parent[0] === 'قیمت' && option === 'گرانترین'
//                                 ? setSortedata(
//                                     [...sortedata].sort(
//                                       (a, b) => b.price - a.price
//                                     )
//                                   )
//                                 : setSortedata(
//                                     [...sortedata].sort(
//                                       (a, b) => a.price - b.price
//                                     )
//                                   )
//                             }
//                           >
//                             {option}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                 </div>
//               ))}
//             </div>

//             <FaBasketShopping className={styles.basketicon} />
//           </div>
//           <div className={styles.producto}>
//             {sortedata?.map((product, productindex) => (
//               <div
//                 key={productindex}
//                 className={styles.product}
//                 onMouseOver={() => setProductover(productindex)}
//                 onMouseLeave={() => setProductover(null)}
//               >
//                 <NextSeo {...generateSEO(product)} />
//                 <Image
//                   priority
//                   src={product.src}
//                   onClick={() => open(`/Store/${product.title}`)}
//                   alt={product.title}
//                   style={{ opacity: productover === productindex ? 0.2 : 1 }}
//                   width={712}
//                   height={712}
//                   className={styles.productimage}
//                 />
//                 {productover === productindex && (
//                   <div
//                     className={styles.productDescription}
//                     onClick={() => open(`/Store/${product.title}`)}
//                   >
//                     {product.description}
//                   </div>
//                 )}
//                 <p
//                   className={styles.producTitle}
//                   onClick={() => open(`/Store/${product.title}`)}
//                 >
//                   {product.title}
//                 </p>
//                 <div className={styles.priceaction}>
//                   <p className={styles.productprice}>
//                     {product.price}
//                     {' تومان '}
//                   </p>
//                   {favorites.includes(product._id) ? (
//                     <BsSuitHeartFill
//                       className={styles.heartIcon}
//                       onClick={() => removefave(product._id)}
//                     />
//                   ) : (
//                     <BsSuitHeart
//                       onClick={() => addfave(product._id)}
//                       className={styles.heartIcon}
//                     />
//                   )}
//                   {product && basket[1]?.includes(product._id) ? (
//                     PriceAction(
//                       `${basket[0].find((d) => {
//                         if (d.split('*2%2&7(7)5%5!1@2')[2] === product._id)
//                           return d
//                       })}`,
//                       '5vh'
//                     )
//                   ) : (
//                     <MdAddCircle
//                       className={styles.inceriment}
//                       size={'4vh'}
//                       onClick={() => increment(product._id, product.price)}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))}
//             {Array.apply(0, Array(5)).map((x, i) => (
//               <div
//                 className={`${styles.product} ${styles.loadingPlaceholder}`}
//                 key={i}
//               >
//                 <div className={styles.productimage} />
//                 <div className={styles.productDescription} />
//                 <p className={styles.producTitle} />
//                 <div className={styles.priceaction} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
// export default Store
