/** @format */

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
