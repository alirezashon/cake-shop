/** @format */

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { BasketProvider } from "@/Context"
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title> roommode </title>
        <meta name='description' content='top shop store' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='images/icon.png' />
      </Head>
      <BasketProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </BasketProvider>
    </>
  )
}

export default App
