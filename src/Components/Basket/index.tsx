/** @format */

import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GiCrossMark } from 'react-icons/gi'
import Products from './Products'
import { ProductInterface } from '@/Interfaces'
import { useBasket } from '@/Context/Basket'

interface BasketProps {
  basketData: ProductInterface[]
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}
const Basket: React.FC<BasketProps> = ({
  basketData,
  isBasketOpen,
  setIsBasketOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { basket, setBasket } = useBasket()

  const closeNav = (event: MouseEvent) => {
    if (
      isBasketOpen &&
      parseInt(`${document.getElementById('openBox')?.offsetWidth}`) <
        event.clientX
    ) {
      setIsBasketOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', closeNav)
    return () => {
      window.removeEventListener('click', closeNav)
    }
  }, [])

  const getBuy = () => {
    setIsLoading(true)
    location.href = '/newReq/pay'
  }
  return (
    <>
      {isBasketOpen ? (
        <div className={`${styles.basketDrawer}  `} id='openBox'>
          <div className={styles.basketHeader}>
            <GiCrossMark
              className={'cross'}
              size={'5vh'}
              onClick={() => setIsBasketOpen(false)}
            />
            <div className={styles.calculateBox}>
              <p>مجموع هزینه ها : </p>
              <p>{basket[3] && basket[2] * basket[3]} تومان </p>
            </div>
          </div>
          <div className={styles.basketBase}>
            {/* {isloading ? <div className={styles.loading}></div> :} */}
            <Products setLoading={isLoading} basketData={basketData} />
            <div className={styles.confirm} onClick={getBuy}>
              ثبت سفارش
            </div>
          </div>
        </div>
      ) : (
        <div>
          <AiOutlineShoppingCart
            className={styles.basketBall}
            color={'white'}
            onClick={() => setIsBasketOpen(true)}
          />
          {basket[3] > 0 && (
            <div className={styles.productCount}>{basket[3]}</div>
          )}
        </div>
      )}
    </>
  )
}
export default Basket
