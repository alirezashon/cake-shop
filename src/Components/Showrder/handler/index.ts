import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export const statusaction = async (
  toast: RefObject<Toast>,
  status: string,
  id: string
) => {
  try {
    toast.current?.show({
      severity: 'info',
      summary: 'در حال پردازش',
      detail: 'در انتظار ارتباط با سرور',
      life: 3000,
    })
    const response = await fetch('/api/data/Post/Admin/orders/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authType: 'n(k*i)o*a(f&h*k%y$w$q#a7)',
        status,
        id,
      }),
    })
    const data = await response.json()
    if (data.success === true && response.status === 200) {
     toast.current?.show({
        severity: 'success',
        summary: 'با موفقیت ویرایش شد',
        detail: 'موفق',
        life: 3000,
      })
      location.reload()
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
