import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'
import Router from 'next/router'

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

  // try {
  //   const response = await fetch(
  //     '/api/data/Post/Client/userinfo/favorite/Add',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         product,
  //         authType: '%a&d*v*a(e)t(q^g%p%s$a%g@i#',
  //       }),
  //     }
  //   )
  //   const data = await response.json()
  //   if (data.success === true && response.status === 200) {
      // return toast.current?.show({
      //   severity: 'success',
      //   summary: 'با موفقیت ویرایش شد',
      //   detail: 'موفق',
      //   life: 3000,
      // })
  //   } else {
      // return toast.current?.show({
      //   severity: 'error',
      //   summary: 'لطفا مجدد تلاش کنید',
      //   detail: 'ناموفق',
      //   life: 3000,
      // })
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
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



