import { ProductInterface } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'
import { Dispatch, SetStateAction } from 'react'

export const fetchProducts = async (
  page: number,
  setSortedata: Dispatch<SetStateAction<ProductInterface[]>>
) => {
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
  if (res.status === 200 && data.success) {
    setSortedata((prev) => [...prev, ...data.products])
  }
}

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
