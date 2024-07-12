import styles from './index.module.css'
import Carouselali from './Gallery'
import { MdAddCircle } from 'react-icons/md'
import { FaMinus } from 'react-icons/fa'
import { Add, Remove, Get } from '../../../Components/Basket/Actions'
import Image from 'next/image'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useBasket } from '@/Context/Basket'
import { ProductInterface } from '@/Interfaces'
import Modal from '../../Modal'
import StarRating from '@/Components/Rating'
import ShowRating from '@/Components/Rating/ShowRates'
import CommentRating from '@/Components/Rating/RateOnComment'
interface Props {
  post: ProductInterface
}

const Details: React.FC<Props> = ({ post }) => {
  const { basket, setBasket } = useBasket()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const refs: {
    [key: string]: RefObject<HTMLInputElement | HTMLTextAreaElement | number>
  } = {
    name: useRef<HTMLInputElement>(null),
    content: useRef<HTMLTextAreaElement>(null),
    rate: useRef<number>(5),
  }
  const addToBasket = (id: string, price: number) => {
    increment(id, price)
    setShowModal(true)
  }

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

  const addComment = async (id: string) => {
    const res = await fetch('/api/data/Post/Client/addComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        comment: {
          client: `${refs.name.current?.valueOf}`,
          content: `${refs.content.current?.valueOf}`,
          rates: `${refs.rate.current?.valueOf}`,
        },
        authType: '(a&D*m%o$t^C@e$n%t(A)m)',
      }),
    })
    const postData = await res.json()
    res.ok && location.reload()
    console.log(post)
  }
  return (
    <>
      <Modal
        show={showModal}
        data={{ title: 'این کالا به سبد خرید اضافه شد!', message: post.title }}
        onClose={() => setShowModal(false)}
      />
      <div className={styles.screenBox}>
        <div className={styles.content}>
          {post.subImages?.length > 0 && (
            <div className={styles.galleryBox}>
              <Carouselali
                structure={post.subImages.map((subImage) => ({
                  src: subImage,
                  alt: post.title,
                }))}
              />
            </div>
          )}
          <ShowRating displayRating={post.rates} />

          <div className={styles.screenIssueLogoBox}>
            <Image
              width={1111}
              height={1111}
              alt='post'
              className={styles.issueScreenLogo}
              src='/images/icon.png'
            />
          </div>
          <div className={styles.postDetails}>
            <div className={styles.namategory}>
              <h4>{post.categories}</h4>/<h5>{post.title}</h5>
            </div>
            <div className={styles.description}>{post.description}</div>
          </div>

          <div className={styles.basket}>
            <div className={styles.basketHead}>
              <Image src={'/images/icon.png'} width={77} height={77} alt='' />
              کیک خونه
            </div>
            <div className={styles.headLinePoint}>
              ۸۷.۲% رضایت از کالا عملکرد عالی
            </div>
            <div className={styles.price}>
              <div>
                {`${post.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان
              </div>
            </div>
            <div className={styles.producto}>
              <div className={styles.title}>{post.title}</div>
              <Image
                className={styles.mainImage}
                src={`data:image/jpeg;base64,${Buffer.from(post.src).toString(
                  'base64'
                )}`}
                width={777}
                height={777}
                alt=''
              />
              <div style={{ direction: 'ltr' }}>
                <StarRating id={post._id} />
              </div>
              <div className={styles.priceAction}>
                {parseInt(
                  `${
                    basket[0][basket[1].indexOf(post._id)]?.split(
                      '*2%2&7(7)5%5!1@2'
                    )[3]
                  }`
                ) > 0 ? (
                  <div className={styles.details}>
                    <div className={styles.controlBox}>
                      <MdAddCircle
                        className={styles.inceriment}
                        onClick={() => increment(post._id, post.price)}
                      />
                      <div className={styles.count}>
                        {`${
                          basket[0][basket[1].indexOf(post._id)]?.split(
                            '*2%2&7(7)5%5!1@2'
                          )[3]
                        } `}
                        عدد در سبد شما
                      </div>
                      <FaMinus
                        className={styles.deceriment}
                        onClick={() => decrement(post._id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.addToBasket}
                    onClick={() => addToBasket(post._id, post.price)}
                  >
                    افزودن به سبد خرید
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.commentSection}>
          {showForm ? (
            <form
              className={styles.addCommentForm}
              onSubmit={(e) => {
                e.preventDefault()
                // sendit()
              }}
            >
              <div
                className={styles.closeButton}
                onClick={() => setShowForm(false)}
              >
                ✕
              </div>
              <div className={styles.starBox}>
              <StarRating id={post._id} />
              </div>
              <div className={styles.addCommentRow}>
                <input
                  ref={refs.name as RefObject<HTMLInputElement>}
                  placeholder={`نام . . .`}
                />
                <textarea
                  ref={refs.content as RefObject<HTMLTextAreaElement>}
                  placeholder={'متن پیام خود را وارد کنید . . .'}
                ></textarea>
              </div>
              <input
                value={'ارسال'}
                type='submit'
                className={styles.submito}
                onClick={() => addComment(post._id)}
              />
            </form>
          ) : (
            <div
              className={styles.addComment}
              onClick={() => setShowForm(true)}
            >
              ثبت دیدگاه
            </div>
          )}
          <div className={styles.existComments}>
            {post.comments.map((comment) => (
              <div className={styles.commentBox}>
                <div className={styles.rates}>
                  <ShowRating displayRating={comment.rates} />
                </div>
                <div className={styles.comment}>
                  <div className={styles.sender}>
                    {comment.client}
                    <div className={styles.time}>{comment.content.time}</div>
                  </div>
                  <div className={styles.text}>{comment.content.txt}</div>
                </div>
                <div className={styles.response}>
                  <div className={styles.admin}>
                    {'  ادمین '}
                    <div className={styles.time}>{comment.response.time}</div>
                  </div>
                </div>
                <div className={styles.adminText}>{comment.response.txt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
