import { createContext, useContext, useState, ReactNode } from "react"

interface BasketContextProps {
  basket: string[][]
  setBasket: (basket: string[][]) => void
  total: [number, number]
  setTotal: (total: [number, number]) => void
}

const BasketContext = createContext<BasketContextProps | undefined>(undefined)

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<string[][]>([])
  const [total, setTotal] = useState<[number, number]>([0, 0])

  return (
    <BasketContext.Provider value={{ basket, setBasket, total, setTotal }}>
      {children}
    </BasketContext.Provider>
  )
}

export const useBasket = () => {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider")
  }
  return context
}
