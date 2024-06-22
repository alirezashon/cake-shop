import Router from 'next/router'
import { Toast } from 'primereact/toast'
import { RefObject } from 'react'

export const sendOTP = async (
  phone: string,
  toast: RefObject<Toast>,
  setOtpSent: (value: boolean) => void
) => {
  if (phone.length !== 11) {
    toast.current?.show({
      severity: 'error',
      summary: 'شماره تماس اشتباه است',
      detail: 'ناموفق',
      life: 3000,
    })
    return
  }

  try {
    const response = await fetch('/api/Auth/Register/InsertNumber', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      toast.current?.show({
        severity: 'success',
        summary: 'کد برای شماره ارسال شد',
        detail: 'موفق',
        life: 3000,
      })
      setOtpSent(true)
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'خطا در ارسال کد',
        detail: 'ناموفق',
        life: 3000,
      })
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    toast.current?.show({
      severity: 'error',
      summary: 'خطا در سرور',
      detail: 'ناموفق',
      life: 3000,
    })
  }
}

export const InsertNumber = async (
  setIsLoading: (arg: boolean) => void,
  phone: string,
  otp: string,
  toast: RefObject<Toast>
) => {
  toast.current?.show({
    severity: 'info',
    summary: 'در حال اجرا',
    detail: 'سرور در حال پردازش',
    life: 1300,
  })
  setIsLoading(true)

  try {
    const response = await fetch('/api/Auth/Register/InsertNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        authType: 'C%L&i*l(r&e%g#i$s&p*h)o(n&e*T$e#R',
        otp,
      }),
    })
    const data = await response.json()

    if (response.status === 200 ) {
      toast.current?.show({
        severity: 'success',
        summary: 'ثبت نام با موفقیت انجام شد',
        detail: 'موفق',
        life: 4000,
      })
      Router.push('/profile')
    } else if (response.status === 400) {
      toast.current?.show({
        severity: 'error',
        summary: 'کد اشتباه می باشد',
        detail: 'نا موفق',
        life: 3000,
      })
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'لطفا مجدد تلاش کنید',
        detail: 'نا موفق',
        life: 3000,
      })
    }
  } catch (error) {
    console.error('Error during registration:', error)
    toast.current?.show({
      severity: 'error',
      summary: 'خطا در سرور',
      detail: 'ناموفق',
      life: 3000,
    })
  } finally {
    setIsLoading(false)
  }
}
