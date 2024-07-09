import Image from 'next/image'
import styles from './index.module.css'
import Layout from '@/Layouts'
import { useEffect, useState } from 'react'
import { GetFave, AddFave, RemoveFave } from '@/Components/Store/Favorites'
import { ProductInterface } from '@/Interfaces'
import { generateSEO } from '@/Components/Store/SEO'
import { NextSeo } from 'next-seo'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { TbShoppingBagX } from 'react-icons/tb'

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [data, setData] = useState<ProductInterface[]>([])
  const [productover, setProductover] = useState<number | null>(null)

  const getData = async () => {
    const response = await fetch('/api/data/Post/Client/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bulkID: GetFave(),
        authType: 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$',
      }),
    })
    const result = await response.json()
    setData(result.products)
  }
  useEffect(() => {
    setFavorites(GetFave())
    getData()
  }, [setFavorites])
  const addfave = (id: string) => {
    AddFave(id)
    setFavorites(GetFave())
  }

  const removefave = (id: string) => {
    RemoveFave(id)
    setData((prv) => prv.filter((p) => p._id !== id))
    setFavorites(GetFave())
  }
  return (
    <Layout>
      <div className={styles.container}>
        {data.length > 0 ? (
          data?.map((product, productindex) => (
            <div
              key={productindex}
              className={styles.product}
              onMouseOver={() => setProductover(productindex)}
              onMouseLeave={() => setProductover(null)}
            >
              <NextSeo {...generateSEO(product)} />
              <Image
                loading='lazy'
                src={`data:image/jpeg;base64,${Buffer.from(
                  product.src
                ).toString('base64')}`}
                onClick={() => open(`/Store/${product.title}`)}
                alt={product.title}
                style={{ opacity: productover === productindex ? 0.2 : 1 }}
                width={1212}
                height={1212}
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
              </div>
            </div>
          ))
        ) : (
          <>
            <TbShoppingBagX className={styles.emptyBasket} />
            <p>سبد خرید شما خالیست</p>
            <div className={styles.confirm} onClick={() => open('/Store')}>
              برو به فروشگاه
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
export default Favorites
