import { NextPage, GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Layout from '@/Layouts'
import { generateSEO } from '@/Components/SEO'
import { NextSeo } from 'next-seo'
import { ProductInterface } from '@/Interfaces'
import { useEffect } from 'react'
import { useProducts } from '@/Context/Products'

const Handler = dynamic(() => import('../Handler'), {
  loading: () => <p>در حال بارگیری ...</p>,
})

interface Props {
  initialProducts: ProductInterface[]
}

const RootPage: NextPage<Props> = () => {


  return (
    <>
      <Layout>
        <NextSeo {...generateSEO()} />
        <Handler />
      </Layout>
    </>
  )
}

export default RootPage
