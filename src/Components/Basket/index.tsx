/** @format */

import { useEffect, useState } from 'react'
import styles from './index.module.css'
import {SlBasket } from 'react-icons/sl'
import { GiCrossMark } from 'react-icons/gi'
import Products from './Products'
import { useBasket } from '@/Context/Basket'
import { TbShoppingBagX } from 'react-icons/tb'

interface BasketProps {
  isBasketOpen: boolean
  setIsBasketOpen: (value: boolean) => void
}
const Basket: React.FC<BasketProps> = ({
  isBasketOpen,
  setIsBasketOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { basket } = useBasket()

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
            <Products loading={isLoading} />
            {basket.length > 0 ? (
              <>
                <div className={styles.confirm} onClick={getBuy}>
                  ثبت سفارش
                </div>
              </>
            ) : (
              <div className={styles.emptyContainer}>
                <TbShoppingBagX className={styles.emptyBasket} />
                <p>سبد خرید شما خالیست</p>
                <div className={styles.gotoStore} onClick={()=>open('/Store')}>
                  برو به فروشگاه
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <SlBasket
            className={styles.basketBall}
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
