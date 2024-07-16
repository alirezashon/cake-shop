import dynamic from 'next/dynamic'
import styles from './index.module.css'

const CupcakeDisplay = dynamic(() => import('../Components/CupCakes'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Main = dynamic(() => import('../Components/Main'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Footer = dynamic(() => import('../Components/Footer'), {
  loading: () => <div className={styles.loadingChat}></div>,
})

const Handler: React.FC = () => {
  return (
    <div style={{ display: 'grid' , width:'100vw' }}>
      <CupcakeDisplay />
      <Main />
      <Footer />
    </div>
  )
}

export default Handler
