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