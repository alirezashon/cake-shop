
import styles from './index.module.css'
import Carouselali from '../../../Components/Carouselali'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import Link from 'next/link'
import { Add, Remove, Get } from '../../../Components/Basket/Actions'
import Image from 'next/image'
import Related from '../../../Components/Related'
import { useEffect } from 'react'
import { useBasket } from '@/Context/Basket'
import { ProductInterface } from '@/Interfaces'
interface Props {
  post: ProductInterface
}

const Details: React.FC<Props> = ({ post }) => {
  const { basket, setBasket } = useBasket()

  const increment = (id: string, price: number) => {
    Add(id, price)
    setBasket(Get())
  }

  const decrement = (id: string) => {
    Remove(id)
    setBasket(Get())
  }

  useEffect(() => {
    setBasket(Get())
  }, [setBasket])

  return (
    <>
      <div className={styles.screenBox}>
        <div className={styles.related}>
          <Related searchString='' />
        </div>
        <div className={styles.priceRow}>
          <span> {post.price} تومان </span>
        </div>
        <div className={styles.screenBody}>
          <div className={styles.screenIssueLogoBox}>
            <Image
              width={1111}
              height={1111}
              alt='post'
              className={styles.issueScreenLogo}
              src='/images/icon.png'
            />
          </div>
          <div className={styles.container}>
            <div className={styles.title}>
              <span>{post.title} </span>
            </div>

            <div className={styles.detailsBox}>
              <div className={styles.innerPostBox}>
                <div className={styles.postBox}>
                  <div className={styles.postDetails}>
                    <div className={styles.textBox}>
                      <p className={styles.text}>
                        <span>نام : </span>
                        <span>{post.title} </span>
                      </p>
                    </div>

                    <div className={styles.detailsRow}>
                      <span>کالری : </span>
                      <span>{post.calories} </span>
                    </div>
                  </div>
                </div>
                <div className={styles.imageBox}>
                  <Link target='blank' href={`/Post/${post.title}`}>
                    <Image
                      src={`data:image/jpeg;base64,${post.src}`}
                      alt={post.description}
                      width={777}
                      height={200}
                      className={styles.image}
                    />
                  </Link>
                </div>
                {basket[1] && basket[1].includes(post._id) ? (
                  <div className={styles.productDetails}>
                    <div className={styles.details}>
                      <div className={styles.priceBox}>
                        مجموع :
                        {post.price *
                          parseInt(
                            basket[0][basket[1].indexOf(post._id)].split(
                              '*2%2&7(7)5%5!1@2'
                            )[1]
                          )}
                      </div>
                      <div className={styles.controlBox}>
                        <MdAddCircle
                          className={styles.inceriment}
                          size={'3vh'}
                          onClick={() => increment(post._id, post.price)}
                        />
                        <p className={styles.count}>
                          {post._id &&
                            parseInt(
                              basket[0][basket[1].indexOf(post._id)].split(
                                '*2%2&7(7)5%5!1@2'
                              )[1]
                            )}
                        </p>
                        <FaMinus
                          className={styles.deceriment}
                          size={'3vh'}
                          onClick={() => decrement(post._id)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.innerPriceBasketBox}>
                    <div
                      className={styles.priceBasket}
                      onClick={() => increment(post._id, post.price)}
                    >
                      <div className={styles.iconBox}>
                        <AiOutlineShoppingCart
                          size={'5vh'}
                          color={'rgb(255,255,255)'}
                          className={styles.icon}
                        />
                        <p className={styles.quantity}>{post.comments}</p>
                      </div>
                      <a className={styles.price}> {post.price} تومان </a>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.carouselaliBox}>
                <Carouselali
                  structure={post.subImages.map((subImage) => ({
                    src: subImage,
                    alt: post.title,
                  }))}
                />
              </div>
            </div>
            <div className={styles.bottomBox}>
              <div className={styles.detailsRow}>
                <span>توضیحات : </span>
                <span>{post.description} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Details
