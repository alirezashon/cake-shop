import { Add, Get, Remove } from '../../Basket/Actions'
import { AddFave, GetFave, RemoveFave } from '../Favorites'
import { MdAddCircle } from 'react-icons/md'
import styles from '../index.module.css'
import { FaMinus } from 'react-icons/fa'

export const increment = (
  id: string,
  price: number,
  setBasket: (basket: [string[], string[], number, number]) => void
) => {
  Add(id, price)
  setBasket(Get())
}

export const decrement = (
  id: string,
  setBasket: (basket: [string[], string[], number, number]) => void
) => {
  Remove(id)
  setBasket(Get())
}
export const addfave = (
  id: string,
  setFavorites: (basket: string[]) => void
) => {
  AddFave(id)
  setFavorites(GetFave())
}

export const removefave = (
  id: string,
  setFavorites: (basket: string[]) => void
) => {
  RemoveFave(id)
  setFavorites(GetFave())
}

export const PriceAction = (
  product: string,
  fontSize: string,
  setBasket: (basket: [string[], string[], number, number]) => void
) => {
  return (
    <div className={styles.priceAction}>
      <MdAddCircle
        className={styles.inceriment}
        size={fontSize}
        onClick={() =>
          increment(
            product.split('*2%2&7(7)5%5!1@2')[2],
            parseInt(product?.split('*2%2&7(7)5%5!1@2')[1]),
            setBasket
          )
        }
      />
      <p className={styles.total}>{product.split('*2%2&7(7)5%5!1@2')[3]}</p>
      <FaMinus
        className={styles.deceriment}
        size={fontSize}
        onClick={() =>
          decrement(product.split('*2%2&7(7)5%5!1@2')[2], setBasket)
        }
      />
    </div>
  )
}
