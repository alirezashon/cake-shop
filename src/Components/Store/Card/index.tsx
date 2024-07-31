import React, { useState } from 'react'
import { ProductInterface } from '@/Interfaces'
import Image from 'next/image'
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import styles from '../index.module.css'
import { useBasket } from '@/Context/Basket'
import { Add, Get, Remove } from '../../Basket/Actions'
import { GetFave, AddFave, RemoveFave } from '../Favorites'


interface ProductCardProps {
  product: ProductInterface
  isHovered: boolean
  onHover: (isHovered: boolean) => void
  onNavigate: (path: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHovered,
  onHover,
  onNavigate,
}) => {
  const { basket, setBasket } = useBasket()
  const [favorites, setFavorites] = useState<string[]>(GetFave())

  const increment = (id: string, price: number) => {
    Add(id, price)
    setBasket(Get())
  }

  const decrement = (id: string) => {
    Remove(id)
    setBasket(Get())
  }

  const addFave = (id: string) => {
    AddFave(id)
    setFavorites(GetFave())
  }

  const removeFave = (id: string) => {
    RemoveFave(id)
    setFavorites(GetFave())
  }

  const PriceAction = (product: string, fontSize: string) => {
    return (
      <div className={styles.priceAction}>
        <MdAddCircle
          className={styles.inceriment}
          size={fontSize}
          onClick={() =>
            increment(
              product.split('*2%2&7(7)5%5!1@2')[2],
              parseInt(product?.split('*2%2&7(7)5%5!1@2')[1])
            )
          }
        />
        <p className={styles.total}>{product.split('*2%2&7(7)5%5!1@2')[3]}</p>
        <FaMinus
          className={styles.deceriment}
          size={fontSize}
          onClick={() => decrement(product.split('*2%2&7(7)5%5!1@2')[2])}
        />
      </div>
    )
  }

  return (
    <div
      className={styles.product}
      onMouseOver={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <Image
        priority
        src={product.src}
        onClick={() => onNavigate(`/Store/${product.title}`)}
        alt={product.title}
        style={{ opacity: isHovered ? 0.2 : 1 }}
        width={712}
        height={712}
        className={styles.productimage}
      />
      {isHovered && (
        <div
          className={styles.productDescription}
          onClick={() => onNavigate(`/Store/${product.title}`)}
        >
          {product.description}
        </div>
      )}
      <p
        className={styles.producTitle}
        onClick={() => onNavigate(`/Store/${product.title}`)}
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
            onClick={() => removeFave(product._id)}
          />
        ) : (
          <BsSuitHeart
            onClick={() => addFave(product._id)}
            className={styles.heartIcon}
          />
        )}
        {basket[1]?.includes(product._id) ? (
          PriceAction(
            `${basket[0].find((d) => {
              if (d.split('*2%2&7(7)5%5!1@2')[2] === product._id) return d
            })}`,
            '5vh'
          )
        ) : (
          <MdAddCircle
            className={styles.inceriment}
            size={'4vh'}
            onClick={() => increment(product._id, product.price)}
          />
        )}
      </div>
    </div>
  )
}

export default ProductCard
