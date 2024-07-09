import dynamic from 'next/dynamic'
import Head from 'next/head'
import styles from './index.module.css'
const ChatUI = dynamic(() => import('../Components/Chat'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Navigation = dynamic(() => import('../Components/Navigation'), {
  loading: () => <div className={styles.loadingChat}></div>,
})
const Layout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title> کیک خونه </title>
        <meta name='description' content='top shop store' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='../../public/images/icon.png' />
      </Head>
      <div>
        <div>
          <ChatUI />
        </div>
        <Navigation />
        <main style={{ marginTop: '12vh' }}>{children}</main>
      </div>
    </>
  )
}

export default Layout
