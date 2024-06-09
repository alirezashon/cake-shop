/** @format */

import crypto from "crypto"
import { decryptText, generateKeyAndIV, encryptText } from "../CryptoUtils"
export const SignIn = async (
  setIsLoading: (arg: boolean) => void,
  user: number,
  password: string
) => {
  setIsLoading(true)

  try {
    const response = await fetch("/api/Auth/Session/Generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPass: user + "&" + password,
        authType: "&^ClieNt%LOgIn^&B*y^P$h#o@N#E",
      }),
    })
    const data = await response.json()
    if (data.success === true && response.status === 200) {
      const { secretKey, iv } = generateKeyAndIV()

      const kalim = crypto.randomBytes(16).toString("hex")
      const generateUsername = encryptText(
        `${kalim}@lirz0monIam${user}-*/?a0;m%k@w)x(z`,
        secretKey,
        iv
      )
      const userName = generateUsername + "^@LriYkbar0-0" + kalim
      localStorage.setItem("user", JSON.stringify(userName))
      sessionStorage.setItem("token", JSON.stringify(data.token))
      console.log(data)
      return "S!A@k%s$e^x%f^u*l^"
    } else {
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}
export const SignUp = async (
  setIsLoading: (arg: boolean) => void,
  user: number,
  password: string
) => {
  setIsLoading(true)

  try {
    const response = await fetch("/api/Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: user,
        password: password,
        authType: "C%L&i&E^n$T#R&E^g@i&s%T$e#R",
      }),
    })
    const data = await response.json()
    if (data.success === true && response.status === 200) {
      localStorage.setItem("user", JSON.stringify(user))

      return "S!A@k%s$e^x%f^u*l^e@x^R%e$j*i3e%R&"
    } else {
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}
export const SignInoghlia = async (
  setIsLoading: (arg: boolean) => void,
  email: string,
  password: string
) => {
  setIsLoading(true)

  try {
    const response = await fetch("/api/Aderminathorapiamalistalisnaliswow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPass: email + "&" + password,
        authType: "&^Admin%LOgIn^&B*y^P$h#o@N#E",
      }),
    })
    const data = await response.json()
    console.log(response.status)
    if (data.success === true && response.status === 200) {
      return "S!A@k%s$e^x%f^u*l^"
    } else {
      setIsLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}
