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

const RootPage: NextPage<Props> = ({ initialProducts }) => {
  const { setProducts } = useProducts()
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts, setProducts])

  return (
    <>
      <Layout>
        <NextSeo {...generateSEO()} />
        <Handler />
      </Layout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
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
          limit: 15,
        }),
      }
    )

    if (!productsRes.ok) {
      throw new Error('Failed to fetch initial products')
    }

    const { productsWithImages } = await productsRes.json()
    return {
      props: {
        initialProducts: productsWithImages,
      },
    }
  } catch (error) {
    console.error('Error fetching initial props:', error)
    return { props: { initialProducts: [] } }
  }
}
export const config = {
  api: {
    responseLimit: '128mb',
  },
}

export default RootPage
