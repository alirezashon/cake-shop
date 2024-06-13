import Navigation from "../Components/Navigation"
import Head from "next/head"
import { BasketProvider } from "@/Context"
import styles from "./index.module.css"
import { useEffect, useState } from "react"
import { Product } from "@/Interfaces"
import { Get } from "@/Components/Basket/Actions"

const Layout = ({ children }: any) => {
  const [basketData, setBasketData] = useState<Product[]>([])

  const getData = async () => {
    try {
      const response = await fetch("/api/data/Post/Client/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bulkID: Get()[1],
          authType: "G&E!T*P^R$O#D$U^C@T*B^u$l*K$",
        }),
      })
      const result = await response.json()
      console.log(result)
      setBasketData(result.products)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Head>
        <title> کیک خونه </title>
        <meta name='description' content='top shop store' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='images/icon.png' />
      </Head>
      <BasketProvider>
        <div>
          <Navigation basketData={basketData} />
          <main style={{ marginTop: "9vh" }}>{children}</main>
        </div>
      </BasketProvider>
    </>
  )
}

export default Layout
