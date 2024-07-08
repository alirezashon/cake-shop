import Navigation from "../Components/Navigation"
import Head from "next/head"
import { BasketProvider } from "@/Context/Basket"
import { useEffect, useState } from "react"
import { ProductInterface } from "@/Interfaces"
import { Get } from "@/Components/Basket/Actions"

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
          <main >{children}</main>
        </div>
    </>
  )
}

export default Layout
