import { Category, ProductInterface } from '../Interfaces'
import dynamic from 'next/dynamic'
import styles from './index.module.css'

const ChatUI = dynamic(() => import('../Components/Chat'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Store = dynamic(() => import('../Components/Store'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Main = dynamic(() => import('../Components/Main'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Footer = dynamic(() => import('../Components/Footer'), {
  loading: () => <div className={styles.loadingChat}></div>,
})

interface Props {
  initialProducts: ProductInterface[]
  initialTotal: number
  categories: Category[]
}

const Handler: React.FC<Props> = ({
  initialProducts,
  initialTotal,
  categories,
}) => {
  return (
    <div style={{ display: 'grid' }}>
      <Main />
      <Store data={[categories, initialProducts]} total={initialTotal} />
      <Footer />
      <div>
        <ChatUI />
      </div>
    </div>
  )
}

export default Handler
