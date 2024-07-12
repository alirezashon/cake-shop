import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Image from 'next/image'

interface Product {
  _id: string
  title: string
  src: string // Base64 encoded
  subImages: string[] // Base64 encoded
  price?: number
  categories?: string
  comments?: string[]
  description?: string
  keywords?: string[]
  rates?: number
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const socket = io({
      path: '/api/socket/Store',
    })

    socket.emit('getStore', { authType: 'authorized' })

    socket.on('product', (product: Product) => {
      setProducts((prevProducts) => [...prevProducts, product])
    })

    socket.on('done', () => {
      setDone(true)
    })

    socket.on('unauthorized', (message: string) => {
      setError(message)
      socket.disconnect()
    })

    socket.on('error', (message: string) => {
      setError(message)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <Image
            src={`data:image/jpeg;base64,${product.src}`}
            alt={product.title}
            width={500}
            height={500}
          />
          {product.subImages.map((subImage, index) => (
            <Image
              key={index}
              src={`data:image/jpeg;base64,${subImage}`}
              alt={`${product.title} subimage ${index + 1}`}
              width={200}
              height={200}
            />
          ))}
        </div>
      ))}
      {done && <p>All products loaded!</p>}
    </div>
  )
}

export default Home

// import { useEffect, useState } from 'react'
// import Image from 'next/image'

// interface IProduct {
//   _id: string
//   title: string
//   src: string
//   subImages: string[]
//   price?: number
//   categories?: string
//   comments: string[]
//   description?: string
//   keywords?: string[]
//   rates?: number
// }

// const Products = () => {
//   const [products, setProducts] = useState<IProduct[]>([])

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch('/api/test')
//       const data = await response.json()
//       if (data.success) {
//         setProducts(data.data)
//       }
//       console.log(data)
//     }

//     fetchProducts()
//   }, [])

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product._id}>
//           <h2>{product.title}</h2>
//           <Image
//             src={`data:image/jpeg;base64,${product.src}`}
//             alt={product.title}
//             width={500}
//             height={500}
//           />
//           {product.subImages.map((subImage, index) => (
//             <Image
//               key={index}
//               src={`data:image/jpeg;base64,${subImage}`}
//               alt={`${product.title} - SubImage ${index + 1}`}
//               width={100}
//               height={100}
//             />
//           ))}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Products
