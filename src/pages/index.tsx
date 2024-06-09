import { NextSeo } from "next-seo"
import { useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import { Product, Category } from "../DTO"
import dynamic from "next/dynamic"

const Handler = dynamic(() => import("../Handler"), {
  loading: () => <p>در حال بارگیری ...</p>,
})

interface Props {
  product: Product[]
  categories: Category[]
}

const RootPage: NextPage<Props> = ({ product, categories }) => {

  return (
    <>
      <NextSeo
        title='RoomMode'
        description='...'
        canonical='https://www.roommode.ir/'
        openGraph={{
          url: "https://www.roommode.ir/",
          title: "...",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
        }}
      />
      <Handler
        products={product}
        categories={categories}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await fetch(
      `http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "@L$L%O%F#D%M^",
          authType: "G&E!T*P^R$O#D$U^C@T*S",
        }),
      }
    )
    const result = await res.json()

    const product = result.products || []
    const categories = result.categories || []

    return {
      props: {
        product,
        categories,
      },
    }
  } catch (error) {
    console.error("Error fetching initial props:", error)
    return { props: { product: [], categories: [] } }
  }
}

export default RootPage
