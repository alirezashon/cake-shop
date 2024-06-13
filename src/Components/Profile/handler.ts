import { Information } from '@/Interfaces'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'


const changeAddress = async (
  toast: RefObject<Toast>,
  information: Information
) => {
  try {
    const response = await fetch('/api/data/Post/Client/userinfo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        information,
        authType: 'C%L&i&E^ne^D%A$UtR',
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
