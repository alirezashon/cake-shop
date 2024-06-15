import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export const addToFavorite = async (
    toast: RefObject<Toast>,
    information: Information
  ) => {
    try {
      const response = await fetch('/api/data/Post/Client/userinfo/favorite/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          information,
          authType: '%a&d*v*a(e)t(q^g%p%s$a%g@i#',
        }),
      })
      const data = await response.json()
      if (data.success === true && response.status === 200) {
        return toast.current?.show({
          severity: 'success',
          summary: 'با موفقیت ویرایش شد',
          detail: 'موفق',
          life: 3000,
        })
      } else {
        return toast.current?.show({
          severity: 'error',
          summary: 'لطفا مجدد تلاش کنید',
          detail: 'ناموفق',
          life: 3000,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }