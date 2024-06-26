import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'
export const searchAddress = async (
  value: string,
  setMapData: (value: [number, number]) => void
) => {
  try {
    const response = await fetch(
      `https://api.neshan.org/v4/geocoding?address=${value}`,
      {
        method: 'GET',
        headers: {
          'Api-Key': 'service.406fb49d15be4a65bf05a950e7ef5baa',
        },
      }
    )
    const data = await response.json()
    if (response.status === 200 && data.location) {
      setMapData([data.location.y, data.location.x])
    }
  } catch (error) {}
}

export const addAddress = async (
  toast: RefObject<Toast>,
  information: Information
) => {
  try {
    toast.current?.show({
      severity: 'info',
      summary: 'در حال ثبت',
      detail: 'موفق',
      life: 3000,
    })
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
    if (data.success === true && response.status === 200) {
      toast.current?.show({
        severity: 'success',
        summary: 'با موفقیت افزوده شد',
        detail: 'موفق',
        life: 3000,
      })
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'لطفا مجدد تلاش کنید',
        detail: 'ناموفق',
        life: 3000,
      })
    }
  } catch (error) {}
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
  } catch (error) {}
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
    if (data.success === true && response.status === 200) {
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
  } catch (error) {}
}
