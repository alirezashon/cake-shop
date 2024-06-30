/** @format */

import Image from "next/image"
import styles from "./index.module.css"
import { FaMinus } from "react-icons/fa"
import { MdAddCircle } from "react-icons/md"
import React, { useEffect, useState } from "react"
import { Add, Get, Remove } from "../Actions"
import {  ProductInterface } from "../../../Interfaces"
import { useBasket } from "@/Context/Basket"

interface Props {
  setLoading: boolean
  basketData: ProductInterface[]
}
const Products: React.FC<Props> = ({
  setLoading,
  basketData,
}) => {
  const [isloading, setIsLoading] = useState<boolean>(false)
  const { basket, setBasket } = useBasket()

  useEffect(() => {
    setLoading && setIsLoading(true)
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
      {isloading
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
                  src={`data:image/jpeg;base64,${obj.src}`}
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
                          "*2%2&7(7)5%5!1@2"
                        )[3]
                      }`}
                    </div>

                    <div className={styles.price}>{obj.price}</div>
                    <div className={styles.controlBox}>
                      <MdAddCircle
                        className={styles.inceriment}
                        size={"3vh"}
                        onClick={() => increment(obj._id, obj.price)}
                      />
                      {obj._id !== undefined && basket[1].includes(obj._id) ? (
                        <p className={styles.total}>
                          {parseInt(
                            `${
                              basket[0][basket[1].indexOf(obj._id)].split(
                                "*2%2&7(7)5%5!1@2"
                              )[3]
                            }`
                          ) * obj.price}
                        </p>
                      ) : null}
                      <FaMinus
                        className={styles.deceriment}
                        size={"3vh"}
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
