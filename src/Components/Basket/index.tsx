/** @format */

import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GiCrossMark } from "react-icons/gi"
import Products from "./Products"
 import { Product } from "@/DTO"
import { useBasket } from "@/Context"

interface BasketProps {
  basketData: Product[]
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}
const Basket: React.FC<BasketProps> = ({
  basketData,
  isBasketOpen,
  setIsBasketOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalPrice, setTotalPrice] = useState<[number, number]>([0, 0])
  const { basket, setBasket } = useBasket()

  const closeNav = (event: MouseEvent) => {
    if (
      isBasketOpen &&
      parseInt(`${document.getElementById("openBox")?.offsetWidth}`) <
        event.clientX
    ) {
      setIsBasketOpen(false)
    }
  }

  useEffect(() => {
    setTotalPrice([
      basket[0]?.reduce((acc, d) => {
        const parts = d.split("*2%2&7(7)5%5!1@2")
        const count = parseInt(parts[1])
        return acc + count
      }, 0) || 0,
      basket[0]?.reduce((acc, d) => {
        const parts = d.split("*2%2&7(7)5%5!1@2")
        const prico = parseInt(parts[3])
        return acc + prico
      }, 0) || 0,
    ])
    window.addEventListener("click", closeNav)
    return () => {
      window.removeEventListener("click", closeNav)
    }
  }, [])

  const getBuy = () => {
    setIsLoading(true)
    window.location.href = "/newReq/Registered"
  }
  return (
    <>
      {isLoading && (
        <div>
        
        </div>
      )}
      {isBasketOpen ? (
        <div className={`${styles.basketDrawer}  `} id='openBox'>
          <div className={styles.basketHeader}>
            <GiCrossMark
              className={styles.cross}
              size={"5vh"}
              onClick={() => setIsBasketOpen(false)}
            />
            <div className={styles.calculateBox}>
              <p>مجموع هزینه ها : </p>
              <p>{totalPrice && totalPrice[0]} تومان </p>
            </div>
          </div>
          <div className={styles.basketBase}>
            {/* {isloading ? <div className={styles.loading}></div> :} */}
            <Products
              basket={basket}
              setBasket={setBasket}
              setLoading={isLoading}
              basketData={basketData}
            />
            <div className={styles.confirm} onClick={getBuy}>
              ثبت سفارش
            </div>
          </div>
        </div>
      ) : (
        <div>
          <AiOutlineShoppingCart
            className={styles.basketBall}
            color={"white"}
            size={"6vh"}
            onClick={() => setIsBasketOpen(true)}
          />
          {totalPrice && totalPrice[0] > 0 && (
            <div className={styles.productCount}>{totalPrice[1]}</div>
          )}
        </div>
      )}
    </>
  )
}
export default Basket
