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
}

const RootPage: NextPage<Props> = ({ categories }) => {
  return (
    <>
      <Layout>
        <NextSeo {...generateSEO()} />
        <Store category={categories} />
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

    return {
      props: {
        categories,
      },
    }
  } catch (error) {
    console.error('Error fetching initial props:', error)
    return { props: { categories: [] } }
  }
}
export const config = {
  api: {
    responseLimit: '128mb',
  },
}
export default RootPage
