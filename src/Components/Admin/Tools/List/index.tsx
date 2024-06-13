/** @format */

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { MdEditDocument } from "react-icons/md"
import styles from "../../List.module.css" // Update with your CSS file path
import { Tools } from "@/Interfaces"
const List: React.FC = () => {
  const [data, setData] = useState<{
    tools: Tools[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data/Post/Admin/Tools/GET", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "^c(a)ta*sEa0c(Tzol&i^*o%l#sA!",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData(result)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    !data && fetchData()
  }, [])

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>ابزار ساخت کیک</div>
      {isLoading ? (
        Array.apply(0, Array(7)).map((x, i) => (
          <div key={i} className={styles.loading}>
            <div className={styles.loadingRect}></div>
            <div className={styles.loadingSquare}></div>
          </div>
        ))
      ) : (
        <table>
          <thead>
            <tr>
              {["نام", "قیمت", "عکس", "تگ", "درصد مجاز"].map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(data?.tools || []).map((brand) => (
              <tr key={brand._id}>
                <td>{brand.name}</td>
                <td>
                  <div className={styles.colorBox}>{brand.price}</div>
                </td>
                <td>
                  <Image
                    src={`data:image/jpeg;base64,${brand.src}`}
                    alt={brand.tag}
                    width={77}
                    height={77}
                  />
                </td>

                <td>
                  <MdEditDocument className={styles.actionButton} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default List
