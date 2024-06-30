/** @format */

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import { BasketProvider } from '@/Context/Basket'
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <BasketProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </BasketProvider>
    </>
  )
}

export default App
