import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export const Getit = () => {
  const favoriteList: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || '[]'
  )
  return favoriteList
}
export const addToFavorite = async (
  product: string,
  toast: RefObject<Toast>
) => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || '[]'
  )
  favorites.push(product)
  localStorage.setItem(')f*o&7(R^t%i$o^m#', JSON.stringify(favorites))
}
export const removeFavorite = async (
  product: string,
  toast: RefObject<Toast>
) => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(')f*o&7(R^t%i$o^m#') || '[]'
  )
  const indexit = favorites.indexOf(product)
  const removed = favorites.filter((f, index) => index !== indexit)
  localStorage.setItem(')f*o&7(R^t%i$o^m#', JSON.stringify(removed))
}



