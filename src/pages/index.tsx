import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '@/Layouts'
import { generateSEO } from '@/Components/SEO'
import { NextSeo } from 'next-seo'

const Handler = dynamic(() => import('../Handler'), {
  loading: () => <p>در حال بارگیری ...</p>,
})


const RootPage: NextPage= () => {

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
