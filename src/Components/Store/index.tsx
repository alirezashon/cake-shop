import styles from "./index.module.css"
import { BiCake, BiSearch } from "react-icons/bi"
import { GiCakeSlice, GiCarKey } from "react-icons/gi"
import { FaCakeCandles } from "react-icons/fa6"
import { MdCake, MdDeleteForever, MdOutlineCake } from "react-icons/md"
import { PiCakeLight, PiCakeThin } from "react-icons/pi"
import { IoIosArrowForward } from "react-icons/io"
import { useRef } from "react"

const Store: React.FC = () => {
  const category = [
    [<BiCake />, "شیرینی"],
    [<GiCakeSlice />, "کیک تکه‌ای"],
    [<FaCakeCandles />, "کیک تولد"],
    [<MdCake />, "کیک"],
    [<PiCakeLight />, "کیک روشن"],
    [<GiCarKey />, "کلید ماشین"],
    [<MdOutlineCake />, "کیک طرح‌دار"],
    [<PiCakeThin />, "کیک نازک"],
    [<BiCake />, "شیرینی"],
    [<GiCakeSlice />, "کیک تکه‌ای"],
    [<FaCakeCandles />, "کیک تولد"],
    [<MdCake />, "کیک"],
    [<PiCakeLight />, "کیک روشن"],
    [<GiCarKey />, "کلید ماشین"],
    [<MdOutlineCake />, "کیک طرح‌دار"],
    [<PiCakeThin />, "کیک نازک"],
  ]
  const categoryBoxRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: -100, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (categoryBoxRef.current) {
      categoryBoxRef.current.scrollBy({ left: 100, behavior: "smooth" })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuSide}>
          <div className={styles.categoryBox} ref={categoryBoxRef}>
            <IoIosArrowForward
              className={styles.leftIcon}
              onClick={scrollLeft}
            />
            {category.map((cat, index) => (
              <div key={index} className={styles.category}>
                <div className={styles.icon}>{cat[0]}</div>
                <div className={styles.categoryName}>{cat[1]}</div>
              </div>
            ))}
            <IoIosArrowForward
              className={styles.rightIcon}
              onClick={scrollRight}
            />
          </div>
          <div className={styles.menuSearchBox}>
            <form className={styles.searchBar}>
              <BiSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type='search'
                value={"جستجو برای محصولات"}
              />
            </form>
          </div>
        </div>
        <div className={styles.basketSide}>
          <div className={styles.basketHead}>
            سبد خرید
            <MdDeleteForever />
          </div>
          <div className={styles.basketController}>شیرینی کره ای -12+</div>
          <div className={styles.basketDetail}>توضیحات</div>
        </div>
      </div>
    </>
  )
}
export default Store
