import { createContext, useContext, useState, ReactNode } from 'react'

interface FavoritesContextProps {
  favorites: string[]
  setFavorites: (favorites: string[]) => void
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([])

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider')
  }
  return context
}
