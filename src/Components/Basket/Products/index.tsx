/** @format */

import Image from 'next/image'
import styles from './index.module.css'
import { FaMinus } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { Add, Get, Remove } from '../Actions'
import { ProductInterface } from '../../../Interfaces'
import { useBasket } from '@/Context/Basket'
import { useProducts } from '@/Context/Products'

interface Props {
  loading: boolean
}
const Products: React.FC<Props> = ({ loading }) => {
  const [basketData, setBasketData] = useState<ProductInterface[]>([])
  const { basket, setBasket } = useBasket()
  const { products } = useProducts()

  const getData = async () => {
    const response = await fetch('/api/data/Post/Client/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bulkID: Get()[1],
        authType: 'G&E!T*P^R$O#D$U^C@T*B^u$l*K$',
      }),
    })
    const result = await response.json()
    setBasketData(result.products)
  }
  useEffect(() => {
    getData()
    if (basket[0]) {
      if (basket[0].length > 0) {
        const basketItemIds = basket[0].map(
          (item) => item.split('*2%2&7(7)5%5!1@2')[2]
        )
        const items = products.filter((product) =>
          basketItemIds.includes(product._id)
        )
        setBasketData(items)
      }
    }
  }, [])

  const increment = (id: string, price: number) => {
    Add(id, price)
    setBasket(Get())
  }

  const decrement = (id: string) => {
    Remove(id)
    setBasket(Get())
  }
  return (
    <>
      {loading
        ? Array.apply(0, Array(7)).map((x, i) => (
            <div key={i} className={'loading'}>
              <div className={'loadingRect'}></div>
              <div className={'loadingSquare'}></div>
            </div>
          ))
        : basketData?.map((obj) => (
            <div key={obj._id} className={styles.postsContainer}>
              <div className={styles.productBox}>
                <Image
                  src={`data:image/jpeg;base64,${Buffer.from(obj.src).toString(
                    'base64'
                  )}`}
                  alt={obj.description}
                  width={222}
                  height={222}
                  className={styles.image}
                />
                <div className={styles.productDetails}>
                  <div className={styles.title}>{obj.title}</div>
                  <div className={styles.details}>
                    <div className={styles.payDetail}>
                      {`${
                        basket[0][basket[1].indexOf(obj._id)]?.split(
                          '*2%2&7(7)5%5!1@2'
                        )[3]
                      }`}
                    </div>

                    <div className={styles.price}>{obj.price}</div>
                    <div className={styles.controlBox}>
                      <MdAddCircle
                        className={styles.inceriment}
                        size={'3vh'}
                        onClick={() => increment(obj._id, obj.price)}
                      />
                      {obj._id !== undefined && basket[1].includes(obj._id) ? (
                        <p className={styles.total}>
                          {parseInt(
                            `${
                              basket[0][basket[1].indexOf(obj._id)].split(
                                '*2%2&7(7)5%5!1@2'
                              )[3]
                            }`
                          ) * obj.price}
                        </p>
                      ) : null}
                      <FaMinus
                        className={styles.deceriment}
                        size={'3vh'}
                        onClick={() => decrement(obj._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  )
}
export default Products
