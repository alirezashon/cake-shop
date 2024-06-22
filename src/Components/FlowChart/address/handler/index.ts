import { Toast } from "primereact/toast"
import { RefObject } from "react"



export const UpdateAddress = async (
  setIsLoading: (arg: boolean) => void,
  houseNumber: number,
  houseUnit: number,
  address: string,
  toast: RefObject<Toast>
) => {
  setIsLoading(true)

  try {
    const response = await fetch("/api/Auth/Register/UpdateAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authType: "C%L&i*c(h&a*k^a&d%d^r@i#R",
        houseNumber,
        houseUnit,
        address,
      }),
    })
   await response.json()
    if (response.status === 200) {
      const randomString = [...Array(33)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
      setIsLoading(false)
      randomString &&
        localStorage.setItem(
          "s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi",
          JSON.stringify(randomString)
        )
      return toast.current?.show({
        severity: "success",
        summary: "کد برای شماره ارسال شد",
        detail: "موفق",
        life: 3000,
      })
    } else {
      setIsLoading(false)
      localStorage.removeItem("s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi")
      location.reload()
      return toast.current?.show({
        severity: "error",
        summary: "لطفا مجدد تلاش کنید",
        detail: "ناموفق",
        life: 3000,
      })
    }
  } catch (error) {
    return {
      severity: "error",
      summary: "خطای سرور ، لطفا مجدد تلاش کنید",
      detail: "ناموفق",
      life: 3000,
    }
  }
}


