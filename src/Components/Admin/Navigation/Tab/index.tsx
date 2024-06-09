/** @format */

import styles from "./index.module.css"
const Tabs = ["محصولات", 'دسته بندی', "سفارش ها", "ابزار ساخت کیک"]

interface Props {
  setContentId: (id: number) => void
}
const Tab: React.FC<Props> = ({ setContentId }) => {
  return (
    <>
      <div className={styles.tabBar}>
        {Tabs.map((tab, index) => (
          <div
            key={index}
            className={styles.tab}
            onClick={() => setContentId(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    </>
  )
}
export default Tab
