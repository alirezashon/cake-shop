import dynamic from 'next/dynamic'
import styles from './index.module.css'

const ChatUI = dynamic(() => import('../Components/Chat'), {
  loading: () => <div className={styles.loadingChat}></div>,
})

const Main = dynamic(() => import('../Components/Main'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Footer = dynamic(() => import('../Components/Footer'), {
  loading: () => <div className={styles.loadingChat}></div>,
})

const Handler: React.FC= () => {
  return (
    <div style={{ display: 'grid' }}>
      <Main />
      <Footer />
      <div>
        <ChatUI />
      </div>
    </div>
  )
}

export default Handler
