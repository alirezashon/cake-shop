// pages/index.js or any other page/component
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProductInterface } from '@/Interfaces'

const Products = () => {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [page, setPage] = useState(1)
  const limit = 10 // Set your limit here

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/GET/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'G&E!T*P^R$O#D$U^C@T*S',
          page,
          limit,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setProducts(data.products)
      }
    }

    fetchProducts()
  }, [page])

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <Image
            src={product.src}
            alt={product.title}
            width={500}
            height={500}
            quality={100}
          />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <button onClick={() => setPage(page + 1)}>Load more</button>
    </div>
  )
}

export default Products
