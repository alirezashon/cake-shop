import { createContext, useContext, useState, ReactNode } from 'react'
import { ProductInterface } from '@/Interfaces'

interface ProductsContextProps {
  products: ProductInterface[]
  setProducts: (products: ProductInterface[]) => void
}

const initialProducts: ProductInterface[] = [] 

const ProductsContext = createContext<ProductsContextProps>({
  products: initialProducts,
  setProducts: () => {},
})

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[]>(initialProducts)

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
