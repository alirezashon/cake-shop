
import { useEffect, useRef, useCallback, useState, memo } from 'react'
import Image from 'next/image'
import { ProductInterface } from '@/Interfaces'

const Products = () => {
  const [products, setProducts ] = useState<ProductInterface[]>([])
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async (page: number) => {
    setLoading(true)
    const res = await fetch('/api/GET/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authType: 'G&E!T*P^R$O#D$U^C@T*S',
        page: page,
        limit: 10,
      }),
    })

    const data = await res.json()
    if (data.success) {
      setProducts((prev) => [...prev, ...data.products])
    }
    setLoading(false)
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && !loading) {
        setPage((prev) => prev + 1)
      }
    },
    [loading]
  )

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page)
    }
  }, [page])

  useEffect(() => {
    fetchProducts(1)
  }, [])

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.7,
    })

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [handleObserver])

  return (
    <div>
      {products.map((product, index) => (
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
      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  )
}

export default memo(Products)



// import { useEffect, useState, useRef, useCallback } from 'react';
// import Image from 'next/image';
// import { ProductInterface } from '@/Interfaces';

// const Products = () => {
//   const [products, setProducts] = useState<ProductInterface[]>([]);
//   const [page, setPage] = useState(1);
//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const loadMoreRef = useRef<HTMLDivElement | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchProducts = async (page: number) => {
//     setLoading(true);
//     const res = await fetch('/api/GET/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         authType: 'G&E!T*P^R$O#D$U^C@T*S',
//         page: page,
//         limit: 10,
//       }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setProducts((prev) => [...prev, ...data.products]);
//     }
//     setLoading(false);
//   };

//   const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
//     const target = entries[0];
//     if (target.isIntersecting && !loading) {
//       setPage((prev) => prev + 1);
//     }
//   }, [loading]);

//   useEffect(() => {
//     if (page > 1) {
//       fetchProducts(page);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchProducts(1);
//   }, []);

//   useEffect(() => {
//     if (observerRef.current) observerRef.current.disconnect();

//     observerRef.current = new IntersectionObserver(handleObserver, {
//       threshold: 0.7,
//     });

//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

//     return () => {
//       if (observerRef.current) observerRef.current.disconnect();
//     };
//   }, [handleObserver]);

//   return (
//     <div>
//       {products.map((product,index) => (
//         <div key={product._id}>
//           {index}
//           <Image
//             src={product.src}
//             alt={product.title}
//             width={500}
//             height={500}
//             quality={100}
//           />
//           <h2>{product.title}</h2>
//           <p>{product.description}</p>
//           <p>{product.price}</p>
//         </div>
//       ))}
//       <div ref={loadMoreRef} style={{ height: 1 }} />
//     </div>
//   );
// };

// export default Products;
