import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'
import Router from 'next/router'

export const addToFavorite = async (
  toast: RefObject<Toast>,
  information: Information
) => {
  try {
    const response = await fetch(
      '/api/data/Post/Client/userinfo/favorite/Add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          information,
          authType: '%a&d*v*a(e)t(q^g%p%s$a%g@i#',
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
  } catch (error) {
    console.log(error)
  }
}

export const goToBuy = async (toast: RefObject<Toast>) => {
  try {
     toast.current?.show({
      severity: 'info',
      summary: 'بررسی اطلاعات',
      detail: 'در حال برقراری ارتباط با سرور',
      life: 3000,
    })
    const response = await fetch('/api/Auth/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authType: '*v(a&l^8$b#y@t%o*l(x*k)p',
      }),
    })
    const data = await response.json()
    data.Location && Router.replace(`${data.Location}`)
    data.information &&
      localStorage.setItem(
        '$i%F^n&o^r%m$e&y*t%n#',
        JSON.stringify(data.information)
      )
  } catch (error) {
    console.log(error)
  }
}
