import { GetServerSideProps, NextPage } from 'next'
import { Category } from '../../Interfaces'
import dynamic from 'next/dynamic'
import Layout from '@/Layouts'
import { generateSEO } from '@/Components/SEO'
import { NextSeo } from 'next-seo'
const Store = dynamic(() => import('../../Components/Store'), {
  loading: () => <p>در حال بارگیری ...</p>,
})

interface Props {
  categories: Category[]
  initialTotal: number
}

const RootPage: NextPage<Props> = ({ categories, initialTotal }) => {
  return (
    <>
      <Layout>
        <NextSeo {...generateSEO()} />
        <Store total={initialTotal} category={categories} />
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
          authType: '*k)a(L*i^M%a$s@o(t*A(l*',
        }),
      }
    )

    if (!productsRes.ok) {
      throw new Error('Failed to fetch initial products')
    }

    const { totalProducts } = await productsRes.json()

    return {
      props: {
        initialTotal: totalProducts,
        categories,
      },
    }
  } catch (error) {
    console.error('Error fetching initial props:', error)
    return { props: { initialTotal: 0, categories: [] } }
  }
}
export const config = {
  api: {
    responseLimit: '128mb',
  },
}
export default RootPage
