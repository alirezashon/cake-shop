export const InsertNumber = async (
  setIsLoading: (arg: boolean) => void,
  phone: number,
  otp: number
) => {
  setIsLoading(true)
  console.log(otp)
  try {
    const response = await fetch("/api/Auth/Register/InsertNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        authType: "C%L&i*l(r&e%g#i$s&p*h)o(n&e*T$e#R",
      }),
    })
    const data = await response.json()
    if (data.success === true && response.status === 200) {
      setIsLoading(false)
      localStorage.setItem(
        "s(T*a&r)i^o*m#a#b%a*l(F)a)z)l%aBi",
        JSON.stringify(
          Array.from({ length: 33 }, () =>
            "ABCDEFHIJOPQVWXYZabcdefnopqrstuvwxyz0123456789".charAt(
              Math.floor(Math.random() * 62)
            )
          ).join("").toString()
        )
      )
      return "S!A@k%s$e^x%f^u*l^"
    } else {
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}

export const UpdateAddress = async (
  setIsLoading: (arg: boolean) => void,
  phone: number,
  houseNumber: number,
  houseUnit: number,
  address: string
) => {
  setIsLoading(true)

  try {
    const response = await fetch("/api/Auth/Register/UpdateAddress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        authType: "C%L&i*c(h&a*k^a&d%d^r@i#R",
        houseNumber,
        houseUnit,
        address,
      }),
    })
    const data = await response.json()
    if (data.success === true && response.status === 200) {
      setIsLoading(false)
      return "S!A@k%s$e^x%f^u*l^"
    } else {
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}
