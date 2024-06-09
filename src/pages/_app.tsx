/** @format */

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import Layout from "@/Layouts"
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Layout>
        <div>
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  )
}

export default App
