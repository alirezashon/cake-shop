/** @format */

import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { GiCrossMark } from "react-icons/gi"
import Products from "./Products"
import { RingLoader } from "react-spinners"
import { Post } from "@/DTO"
interface BasketProps {
  basket: string[][]
  setBasket: (items: string[][]) => void
  basketData: Post[]
  totalPrice: [number, number]
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}
const Basket: React.FC<BasketProps> = ({
  basket,
  setBasket,
  basketData,
  totalPrice,
  isBasketOpen,
  setIsBasketOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
          <RingLoader
            className={styles.loadingContainer}
            color={"white"}
            loading={isLoading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
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
