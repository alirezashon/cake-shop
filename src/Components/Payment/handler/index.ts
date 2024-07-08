import { Information } from '@/Interfaces'
import { Get } from '../../Basket/Actions'
import Router from 'next/router'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export const getAddress = async (
  setAddress: (value: Information[]) => void,
  setLoading: (value: boolean) => void
) => {
  setLoading(true)
  const response = await fetch('/api/data/Post/Client/userinfo/address/GET', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authType: 'C%a&d*s$r)e)u%p&d$a%t^r@i#R',
    }),
  })
  const result = await response.json()
  setLoading(false)
  setAddress(result.information)
}
export const createOrder = async (
  setSending: (value: boolean) => void,
  image: string,
  address: string,
  toast: RefObject<Toast>
) => {
  toast.current?.show({
    severity: 'info',
    summary: 'بررسی اطلاعات',
    detail: 'در حال برقراری ارتباط با سرور',
    life: 3000,
  })
  setSending(true)
  const response = await fetch('/api/data/Shop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      products: Get()[0],
      attachment: image,
      address,
      authType: 'S&H!O*P^I$N#G$T^I@M*E',
    }),
  })
  const result = await response.json()
  result && setSending(false)
  if (response.status === 200) {
    Router.push('/profile')
    toast.current?.show({
      severity: 'success',
      summary: 'با موفقیت ویرایش شد',
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
}

export const createcustomOrder = async (
  setSending: (value: boolean) => void,
  image: string,
  address: string,
  toast: RefObject<Toast>
) => {
  const details = JSON.parse(
    localStorage.getItem('(a&s*m^o%t&r#D$e7@e!r@o)') || '[]'
  )
  toast.current?.show({
    severity: 'info',
    summary: 'بررسی اطلاعات',
    detail: 'در حال برقراری ارتباط با سرور',
    life: 3000,
  })
  setSending(true)
  const response = await fetch('/api/data/Shop/CustomOrder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      details,
      attachment: image,
      address,
      authType: 'S&_(3(o)7*ama&x(f#T^I@M*E',
    }),
  })
  const result = await response.json()
  result && setSending(false)
  if (response.status === 200) {
    Router.push('/profile')
    toast.current?.show({
      severity: 'success',
      summary: 'با موفقیت ویرایش شد',
      detail: 'موفق',
      life: 3000,
    })
    localStorage.removeItem('(a&s*m^o%t&r#D$e7@e!r@o)')
  } else {
    toast.current?.show({
      severity: 'error',
      summary: 'لطفا مجدد تلاش کنید',
      detail: 'ناموفق',
      life: 3000,
    })
  }
}
