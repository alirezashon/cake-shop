import { BiSolidMessageSquareEdit } from "react-icons/bi"
import styles from "./index.module.css"
import { useState } from "react"

interface Props {
  address: string | undefined | null
  houseNumber: number
  houseUnit: number
  zipCode: number
}
const Address: React.FC<Props> = ({
  address,
  zipCode,
  houseNumber,
  houseUnit,
}) => {
  const [newmew, setNewmew] = useState<[string, number] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const labels = ["آدرس  ", "کد پستی  ", "پلاک", "واحد"]
  const meow = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/data/Post/Client/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "C%L&i&E^ne^D%A$UtR",
          address: newmew && newmew[1] === 0 ? newmew[0] : "",
          zipCode: newmew && newmew[1] === 1 ? newmew[0] : "",
          houseNumber: newmew && newmew[1] === 2 ? newmew[0] : "",
          houseUnit: newmew && newmew[1] === 3 ? newmew[0] : "",
        }),
      })
      await response.json()
      location.reload()
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className={styles.detailBox}>
        {labels.map((label, index) => (
          <div key={index} className={styles.detailRow}>
            <BiSolidMessageSquareEdit
              className={styles.iconedit}
              onClick={() => setNewmew((mew) => [mew ? mew[0] : "", index])}
            />
            <div
              className={styles.innerRow}
              onClick={() => setNewmew((mew) => [mew ? mew[0] : "", index])}
            >
              <label>{label}</label>
              <p>
                {newmew && newmew[1] === index ? (
                  <input
                    placeholder={`${
                      index === 0
                        ? address
                        : index === 1
                        ? zipCode
                        : index === 2
                        ? houseNumber
                        : index === 2 && houseUnit
                    }`}
                    className={styles.onput}
                    onChange={(e) => setNewmew([e.target.value, index])}
                  />
                ) : index === 0 ? (
                  typeof address !== "string" ? (
                    ""
                  ) : (
                    address
                  )
                ) : index === 1 ? (
                  isNaN(zipCode) ? (
                    ""
                  ) : (
                    zipCode
                  )
                ) : index === 2 ? (
                  isNaN(houseNumber) ? (
                    ""
                  ) : (
                    houseNumber
                  )
                ) : isNaN(houseUnit) ? (
                  ""
                ) : (
                  houseUnit
                )}
              </p>
            </div>
            {newmew && newmew[1] === index && (
              <>
                {loading && (
                  <div className=""></div>
                )}
                <input
                  value={"ثبت"}
                  type='submit'
                  onClick={meow}
                  className={styles.submit}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default Address
