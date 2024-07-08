import Navigation from "../Components/Navigation"
import Head from "next/head"

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
          <Navigation />
          <main style={{marginTop:'12vh'}} >{children}</main>
        </div>
    </>
  )
}

export default Layout
