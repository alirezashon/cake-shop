import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'
export const addAddress = async (
  toast: RefObject<Toast>,
  information: Information
) => {
  try {
    const response = await fetch('/api/Auth/Register/InsertAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        information,
        authType: 'C%a&d*s$r)e(k^xa&d%d^r@i#R',
      }),
    })
    const data = await response.json()
    console.log(data)
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

export const updateAddress = async (
  toast: RefObject<Toast>,
  information: Information,
  id: string
) => {
  try {
    const response = await fetch(
      '/api/Auth/data/Post/Client/Client/userinfo/Update',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          information,
          authType: 'C%a&d*s$r)e)u%p&d$a%t^r@i#R',
          id,
        }),
      }
    )
    const data = await response.json()
    console.log(data)
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

export const removeAddress = async (toast: RefObject<Toast>, id: string) => {
  try {
    const response = await fetch(
      '/api/data/Post/Client/userinfo/address/Remove',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'C%a&d&u*P(A)d*t$e#w%o^p&ama*7137^r@i#R',
          id,
        }),
      }
    )
    const data = await response.json()
    console.log(data)
    if (data.success === true && response.status === 200) {
      location.reload()
      return toast.current?.show({
        severity: 'success',
        summary: 'با موفقیت حذف شد',
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
