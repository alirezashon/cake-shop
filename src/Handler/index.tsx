/** @format */

import { Category, Product } from "../DTO"
import dynamic from "next/dynamic"
import styles from "./index.module.css"

const Carouselali = dynamic(() => import("../Components/Carouselali"), {
  loading: () => <div className={styles.loadingCarousel}></div>,
})

const ChatUI = dynamic(() => import("../Components/Chat"), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const BakeCake = dynamic(() => import("../Components/BakeCake"), {
  loading: () => <div className={styles.loadingBake}></div>,
})
interface Props {
  products: Product[]
  categories: Category[]
  totalPrice: [number, number]
  basketData: Product[]
}
const Handler: React.FC<Props> = ({
  products,
  totalPrice,
  categories,
  basketData,
}) => {
  return (
    <>
      {products && (
        <div style={{ display: "grid", gap: "1vh" }}>
          {/* <div>
            <Carouselali structure={carousel} />
          </div> */}
          <BakeCake />

          <div>
            <ChatUI />
          </div>
        </div>
      )}
    </>
  )
}
export default Handler
