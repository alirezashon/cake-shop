/** @format */

import Image from "next/image"
import Address from "./Address/index"
import Chat from "./Chat/index"
import Notification from "./Notifications/index"
import styles from "./index.module.css"
import { useState, useEffect, useRef } from "react"
import Orders from "./Orders/index"
import Favorites from "./Favorites/index"
import LastSeen from "./LastSeen/index"
import { Order } from "@/DTO"
import { BiEdit } from "react-icons/bi"

interface Information {
  address: string
  houseNumber: number
  houseUnit: number
  zipCode: number
}
const Profile = () => {
  const [state, setState] = useState("سفارشات")
  const [data, setData] = useState<
    [Order[], [string, string, string, number, Information]] | null
  >(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newmew, setNewmew] = useState<[string, number] | null>(null)
  const [updating, setUpdating] = useState<boolean>(false)
  const profileBoxRef = useRef<HTMLDivElement>(null)

  const items = [
    "سفارشات",
    "مورد علاقه",
    "گفتگو",
    "آدرس ها",
    "بازدید های اخیر",
    "پیغام ها",
  ]
  const prodetail = ["ایمیل : ", "نام : ", "کد ملی : ", "شماره : "]
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data/Post/Client/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "(k*i)o&R^D&e$r#o@l!A$n%S*o(7)",
        }),
      })
      const responseData = await response.json()
      setData([responseData.orders, responseData.clientDatashow])
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }
  const meow = async () => {
    setUpdating(true)
    try {
      const response = await fetch("/api/data/Post/Client/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "C%L&i&E^ne^D%A$UtR",
          email: newmew && newmew[1] === 0 ? newmew[0] : "",
          name: newmew && newmew[1] === 1 ? newmew[0] : "",
          nationalCode: newmew && newmew[1] === 2 ? newmew[0] : "",
          phone: newmew && newmew[1] === 3 ? newmew[0] : "",
        }),
      })
      await response.json()
      location.reload()
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setUpdating(false)
  }
  useEffect(() => {
    if (!data) {
      fetchData()
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        newmew&&
        profileBoxRef.current &&
        !profileBoxRef.current.contains(event.target as Node)
      ) {
        setNewmew(null)
      }
    }

    if (newmew) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [newmew, setData])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profItems}>
        <div className={styles.profileBox} >
            <Image
              alt=''
              className={styles.image}
              src={"/images/icon.png"}
              width={111}
              height={111}
            />
            <div className={styles.profiletail} ref={profileBoxRef}>
              {prodetail.map((protail, index) => (
                <p
                  key={index}
                  onClick={() =>
                    setNewmew([
                      data &&
                      data[1][index] !== null &&
                      data[1][index] !== undefined
                        ? String(data[1][index])
                        : "",
                      index,
                    ])
                  }
                >
                  {protail}
                  {index !== parseInt(`${newmew && newmew[1]}`) && <BiEdit />}
                  {newmew && newmew[1] === index && (
                    <div className={styles.editRow}>
                      <input
                        value={newmew[0]}
                        placeholder={prodetail[index]}
                        className={styles.onput}
                        onChange={(e) => setNewmew([e.target.value, index])}
                      />
                      {newmew && newmew[1] === index && (
                        <input
                          value={"ثبت"}
                          type='submit'
                          onClick={meow}
                          className={styles.submit}
                        />
                      )}
                    </div>
                  )}
                </p>
              ))}
            </div>
            <div className={styles.itemsBox}>
              {items.map((item) => (
                <>
                  <div
                    className={`${
                      item === state ? styles.selected : styles.item
                    } `}
                    onClick={() => setState(item)}
                  >
                    {item}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        {state === "سفارشات" ? (
          <Orders orders={data && data[0]} loading={isLoading} />
        ) : state === "مورد علاقه" ? (
          <Favorites />
        ) : state === "گفتگو" ? (
          <Chat />
        ) : state === "آدرس ها" ? (
          <Address
            address={data && data[1][4].address}
            zipCode={parseInt(`${data && data[1][4] && data[1][4].zipCode}`)}
            houseUnit={parseInt(
              `${data && data[1][4] && data[1][4].houseUnit}`
            )}
            houseNumber={parseInt(
              `${data && data[1][4] && data[1][4].houseNumber}`
            )}
          />
        ) : state === "بازدید های اخیر" ? (
          <LastSeen />
        ) : (
          state === "پیغام ها" && <Notification />
        )}
      </div>
    </>
  )
}
export default Profile
