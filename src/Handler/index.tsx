import { Category, Product } from "../DTO"
import dynamic from "next/dynamic"
import styles from "./index.module.css"

const ChatUI = dynamic(() => import("../Components/Chat"), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Store = dynamic(() => import("../Components/Store"), {
  loading: () => <div className={styles.loadingChat}></div>,
})

interface Props {
  products: Product[]
  categories: Category[]
}
const Handler: React.FC<Props> = ({ products, categories }) => {
  return (
    <>
      {products && (
        <div style={{ display: "grid", gap: "1vh" }}>
          <Store data={[categories, products]} />
          <div>
            <ChatUI />
          </div>
        </div>
      )}
    </>
  )
}
export default Handler
