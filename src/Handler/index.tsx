import { Category, Product } from '../Interfaces'
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
const BackeCake = dynamic(() => import('../Components/BakeCake'), {
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
        <div style={{ display: 'grid', gap: '1vh' }}>
          <Main />
          <Store data={[categories, products]} />
<BackeCake/>
          <div>
            <ChatUI />
          </div>
        </div>
      )}
    </>
  )
}
export default Handler
