/** @format */

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Image from "next/image"
import { MdEditDocument } from "react-icons/md"
import styles from "./index.module.css" // Update with your CSS file path
import { Tools } from "../../DTO"

const List: React.FC = () => {
  const [data, setData] = useState<Tools[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<string>("")
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data/Post/Client/bakeTool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authType: "^c(a)ta*sEa0c(Tzol&i^*o%l#sA!",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.tools)
        setIsLoading(false)
      } else {
        toast.error("خطا")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("خطا")
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
        // نمایش تگ ها
        <div className={styles.container}>
          <div className={styles.tags}>
            {data &&
              data?.map((tool) => (
                <div
                  className={styles.tagBox}
                  onClick={() => setShowTag(tool.tag)}
                >
                  <Image
                    src={"/omage/موز.jpg"}
                    alt=''
                    width={313}
                    height={313}
                    className={styles.tagimage}
                  />
                  <div className='tag'>{tool.tag}</div>
                  {showTag === tool.tag && (
                  // نمایش لوازم هر تگ
                    <div className={styles.toolBox}>
                      <div className='toolName'>{tool.name}</div>
                      <div className='toolPrice'>{tool.price}</div>
                      <Image
                        src={`data:image/jpeg;base64,${tool.src}`}
                        alt={tool.name}
                        width={313}
                        height={313}
                        className={styles.tagimage}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default List
