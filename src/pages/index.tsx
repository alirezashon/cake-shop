import { GetServerSideProps, NextPage } from 'next'
import { Category, ProductInterface } from '../Interfaces'
import dynamic from 'next/dynamic'
import Layout from '@/Layouts'
import { generateSEO } from '@/Components/SEO'
import { NextSeo } from 'next-seo'

const Handler = dynamic(() => import('../Handler'), {
  loading: () => <p>در حال بارگیری ...</p>,
})

interface Props {
  categories: Category[]
  initialProducts: ProductInterface[]
  initialTotal: number
}

const RootPage: NextPage<Props> = ({
  categories,
  initialProducts,
  initialTotal,
}) => {
  return (
    <>
      <Layout>
      <NextSeo {...generateSEO()} />
        <Handler
          initialProducts={initialProducts}
          initialTotal={initialTotal}
          categories={categories}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const categoriesRes = await fetch(
      `http://localhost:${process.env.PRODUCTION_PORT}/api/GET/categories`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authType: 'G&E!T*P^R$O#D$U^C@T*S',
        }),
      }
    )
    const categoriesResult = await categoriesRes.json()
    const categories = categoriesResult.categories || []

    const productsRes = await fetch(
      `http://localhost:${process.env.PRODUCTION_PORT}/api/GET/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'G&E!T*P^R$O#D$U^C@T*S',
          page: 1,
          limit: 25,
        }),
      }
    )

    if (!productsRes.ok) {
      throw new Error('Failed to fetch initial products')
    }

    const { products, totalProducts } = await productsRes.json()

    return {
      props: {
        initialProducts: products,
        initialTotal: totalProducts,
        categories,
      },
    }
  } catch (error) {
    console.error('Error fetching initial props:', error)
    return { props: { initialProducts: [], initialTotal: 0, categories: [] } }
  }
}
export const config = {
  api: {
    responseLimit: '128mb',
  },
}
export default RootPage
