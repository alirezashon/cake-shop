import { Get } from '@/Components/Basket/Actions'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface BasketContextProps {
  basket: [string[], string[], number, number]
  setBasket: (basket: [string[], string[], number, number]) => void
}

const BasketContext = createContext<BasketContextProps | undefined>(undefined)

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<[string[], string[], number, number]>([
    [],
    [],
    0,
    0,
  ])
  useEffect(()=>{
    setBasket(Get())
  },[setBasket])

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider')
  }
  return context
}
