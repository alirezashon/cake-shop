/** @format */

import Related from "../../Related"
import styles from "./index.module.css"
import Products from "./Products"
const ProductShow: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.related}>
          <Related searchString={"یخچال"} />
        </div>
        <div>
          <Products setLoading />
        </div>
      </div>
    </>
  )
}
export default ProductShow
