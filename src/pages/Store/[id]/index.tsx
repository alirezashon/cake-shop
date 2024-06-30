import { ProductInterface } from '@/Interfaces'
import { GetServerSideProps, NextPage } from 'next'
import Details from '../../../Components/Store/Details'
interface Props {
  post: ProductInterface
}
const Product: NextPage<Props> = ({ post }) => {
  return <> {post && <Details post={post} />} </>
}
export default Product

export const getServerSideProps: GetServerSideProps<Props> = async ({
    params,
  }) => {
    const title = params?.id as string
    console.log(params)
    const res = await fetch(
      `http://localhost:${process.env.PRODUCTION_PORT}/api/data/Post/Client/page`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: '@L$L%O%F#D%M^',
          title: title, // Updated to use the post title as ID
          authType: 'G&E!T*P^R$O#D$U^C@T*S',
        }),
      }
    )
    const postData = await res.json()
    return {
      props: {
        post: postData.products, // Assuming your API response has a "products" field
      },
    }
  }
  